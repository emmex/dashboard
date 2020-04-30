import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {MongoRepository} from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: MongoRepository<User>) {
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({username: username})
  }

}
