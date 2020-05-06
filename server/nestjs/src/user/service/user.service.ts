import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {MongoRepository} from 'typeorm';
import {InsertOneWriteOpResult} from 'typeorm/driver/mongodb/typings';
import {Validate} from '../../util/validation';
import {ValidationException} from '../../util/exception/validation.exception';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: MongoRepository<User>) {
  }

  @Validate()
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email: email})
  }

  @Validate()
  async register(user: User): Promise<InsertOneWriteOpResult> {
    const dbUser = this.userRepository.findOne({email: user.email});
    if (dbUser != null) {
      throw new ValidationException([`user with email ${user.email} already exists`])
    }
    return this.userRepository.insertOne(user);
  }

}
