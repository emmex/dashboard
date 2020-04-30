import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "dashboard",
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
