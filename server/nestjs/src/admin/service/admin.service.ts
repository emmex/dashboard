import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../../user/entity/user.entity';
import {MongoRepository, Repository} from 'typeorm';
import {ObjectID} from 'mongodb';
import {IPaginationOptions, paginate, Pagination} from 'nestjs-typeorm-paginate/index';
import {ValidationException} from '../../util/exception/validation.exception';
import {Validate} from '../../util/validation';
import {UserService} from '../../user/service/user.service';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(User) private readonly userRepository: MongoRepository<User>,
    private readonly userService: UserService
  ) {
  }

  async getPage(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate(this.userRepository as Repository<User>, options, {
      where: {isActive: true}
    })
  }

  @Validate()
  async removeUser(id: string) {
    const dbUser = await this.userRepository.findOne({_id: new ObjectID(id), isActive: true});
    if (dbUser == null) {
      throw new ValidationException([`user with id ${id} does not exists`])
    }
    await this.userRepository.updateOne({_id: new ObjectID(id)}, {$set: {isActive: false}});
  }

  @Validate('email', 'firstName', 'lastName')
  async editUser(user: User) {
    const dbUser = await this.userRepository.findOne({_id: user._id, isActive: true});
    if (dbUser == null) {
      throw new ValidationException([`user with id ${user.id} does not exists`])
    }
    await this.userService.checkEmailIsUniq(user);
    await this.userRepository.save(user);
  }

}
