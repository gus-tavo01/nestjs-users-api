import { Module } from '@nestjs/common';
// dependencies
import { TypeOrmModule } from '@nestjs/typeorm';
// providers
import { AppService } from './app.service';
// controllers
import { AppController } from './app.controller';
import { UsersController } from './controllers/users.controller';
// entities
import { User } from './entities/user.entity';
import { UsersService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'devUser',
      password: 'Password!',
      database: 'messageapp',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
