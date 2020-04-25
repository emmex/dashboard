import {Module} from '@nestjs/common';
import {AuthService} from './service/auth.service';
import {LocalStrategy} from "./strategy/local.strategy";
import {AuthController} from './controller/auth.controller';
import {PassportModule} from "@nestjs/passport";
import {SessionSerializer} from "./session.serializer";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    UserModule,
    PassportModule.register({session: true})
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController]
})
export class AuthModule {
}
