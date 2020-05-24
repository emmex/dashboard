import {Module} from '@nestjs/common';
import {UserController} from './controller/user.controller';
import {UserService} from './service/user.service';
import {User} from './entity/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MailerModule} from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailerModule.forRoot({
      transport: { // runtime variable uses:
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: true,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILE_PASSWORD,
        },
      },
      defaults: {
        from: '"Admin dashboard" <noreply@admin-dashboard.com>' // not work for gmail hosts
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
