import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {MongoRepository} from 'typeorm';
import {InsertOneWriteOpResult} from 'typeorm/driver/mongodb/typings';
import {Validate} from '../../util/validation';
import {ValidationException} from '../../util/exception/validation.exception';
import {ISendMailOptions, MailerService} from '@nestjs-modules/mailer';
import {v4 as v4uuid} from 'uuid';

@Injectable()
export class UserService {

  private readonly EMAIL_CONFIRMATION_BASE_URL = 'http://localhost:4200/email-confirmation'

  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private readonly mailerService: MailerService
  ) {
  }

  @Validate()
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email: email})
  }

  @Validate()
  async register(user: User): Promise<InsertOneWriteOpResult> {
    const dbUser = await this.userRepository.findOne({email: user.email});
    if (dbUser != null) {
      throw new ValidationException([`user with email ${user.email} already exists`])
    }
    return this.userRepository.insertOne(user);
  }

  @Validate()
  async sendConfirmationEmail(email: string): Promise<void> {
    const dbUser = await this.userRepository.findOne({email: email});
    if (dbUser == null) {
      throw new ValidationException([`user with email ${email} does not exists`]);
    }
    if (dbUser.emailConfirmed) {
      throw new ValidationException([`email already confirmed`]);
    }

    let uuid;
    if (!dbUser.emailConfirmationUuid) {
      uuid = v4uuid();
      await this.userRepository.updateOne({_id: dbUser.id}, {$set: {emailConfirmationUuid: uuid}});
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
    const dbUser = await this.userRepository.findOne({email: email});
    if (dbUser == null) {
      throw new ValidationException([`user with email ${email} does not exists`]);
    }
    if (dbUser.emailConfirmationUuid == null || dbUser.emailConfirmationUuid != confirmationUuid) {
      throw new ValidationException(['incorrect user identifier'])
    }
    await this.userRepository.updateOne({_id: dbUser.id}, {$set: {emailConfirmed: true}});
  }

}
