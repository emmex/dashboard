import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommonModule} from './common/common.module';
import {ConfigModule} from '@nestjs/config';
import {AdminModule} from './admin/admin.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: './environment/db.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGO_HOST,
      port: Number.parseInt(process.env.MONGO_PORT),
      database: process.env.MONGO_DB_NAME,
      autoLoadEntities: true,
    }),
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
