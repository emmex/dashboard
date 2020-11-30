import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {MongoRepository} from 'typeorm';
import {InsertOneWriteOpResult} from 'typeorm/driver/mongodb/typings';
import {Validate} from '../../util/validation';
import {ValidationException} from '../../util/exception/validation.exception';
import {ISendMailOptions, MailerService} from '@nestjs-modules/mailer';
import {v4 as v4uuid} from 'uuid';
import {UserRole} from '../entity/user-role.entity';

@Injectable()
export class UserService {

  // APP_URL = 'http://localhost:4200' for dev
  private readonly EMAIL_CONFIRMATION_BASE_URL = `${process.env.APP_URL}/user/email-confirmation`

  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private readonly mailerService: MailerService
  ) {
  }

  @Validate()
  async getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email: email, isActive: true})
  }

  @Validate()
  async register(user: User): Promise<InsertOneWriteOpResult> {
    await this.checkEmailIsUniq(user);
    user.isActive = true;
    return this.userRepository.insertOne(user);
  }

  @Validate()
  async sendConfirmationEmail(email: string): Promise<void> {
    const dbUser = await this.userRepository.findOne({email: email, isActive: true});
    if (dbUser == null) {
      throw new ValidationException([`user with email ${email} does not exists`]);
    }
    if (dbUser.emailConfirmed) {
      throw new ValidationException([`email already confirmed`]);
    }

    let uuid;
    if (!dbUser.emailConfirmationUuid) {
      uuid = v4uuid();
      await this.userRepository.updateOne({_id: dbUser._id}, {$set: {emailConfirmationUuid: uuid}});
    } else {
      uuid = dbUser.emailConfirmationUuid;
    }

    const confirmationLink = `${this.EMAIL_CONFIRMATION_BASE_URL}?uuid=${uuid}&email=${email}`;
    await this.mailerService.sendMail(this.getEmailOptions(email, confirmationLink));
  }

  private getEmailOptions(email: string, link: string): ISendMailOptions {
    return {
      to: email,
      subject: 'Admin dashboard email confirmation',
      html: `<p>To confirm your email address, just click the link below:</p><p><a href="${link}">confirm email</a></p>`
    }
  }

  @Validate()
  async confirmEmail(confirmationUuid: string, email: string): Promise<void> {
    const dbUser = await this.userRepository.findOne({email: email, isActive: true});
    if (dbUser == null) {
      throw new ValidationException([`user with email ${email} does not exists`]);
    }
    if (dbUser.emailConfirmationUuid == null || dbUser.emailConfirmationUuid != confirmationUuid) {
      throw new ValidationException(['incorrect user identifier'])
    }
    await this.userRepository.updateOne({_id: dbUser._id}, {$set: {emailConfirmed: true}, $unset: {emailConfirmationUuid: ''}});
  }

  async checkEmailIsUniq(user: User) {
    const byEmail = await this.userRepository.findOne({
      where:
        {
          email: {$eq: user.email},
          _id: {$not: {$eq: user._id}},
          isActive: {$eq: true}
        }
    });
    if (byEmail != null) {
      throw new ValidationException([`user with email ${user.email} already exists`])
    }
  }

  async rolesList() {
    return Promise.resolve(Object.values(UserRole));
  }

}
