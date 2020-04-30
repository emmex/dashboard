import {Module} from '@nestjs/common';
import {UserController} from './controller/user.controller';
import {UserService} from './service/user.service';
import {User} from './entity/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
