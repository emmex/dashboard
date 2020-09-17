import {Module} from '@nestjs/common';
import {AdminController} from './controller/admin.controller';
import {AdminService} from './service/admin.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../user/entity/user.entity';
import {UserModule} from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {
}
