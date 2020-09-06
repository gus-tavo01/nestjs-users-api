import { Module } from '@nestjs/common';
// dependencies
import { TypeOrmModule } from '@nestjs/typeorm';
// providers
import { UsersService } from './services/user.service';
// controllers
import { UsersController } from './controllers/users.controller';
// entities
import { User } from './entities/user.entity';

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
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
