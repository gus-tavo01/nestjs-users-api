import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dtos/create-user-dto';
import { PatchUserDto } from 'src/dtos/patch-user-dto';
import { UpdateUserDto } from 'src/dtos/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  // TODO
  // create a standard service response with detailed error fields
  // implement validator

  public async getById(userId: number): Promise<User> {
    // TODO
    // validations goes here
    const result = this.usersRepository.findOne(userId);
    return result;
  }

  // get by filters

  public async create(user: CreateUserDto): Promise<User> {
    // TODO
    // validate incoming DTO
    // map DTO to entity
    const newUser = new User();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.phoneNumber = user.phoneNumber;
    const result = await this.usersRepository.save(newUser);
    return result;
  }

  public async remove(id: number): Promise<number> {
    const result = await this.usersRepository.delete(id);
    return result.affected;
  }

  public async patch(id: number, user: PatchUserDto): Promise<number> {
    const result = await this.usersRepository.update(id, user);
    return result.affected;
  }

  public async update(id: number, user: UpdateUserDto) {
    // TODO
    // service validations
    const newUser = new User();
    newUser.id = id;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.phoneNumber = user.phoneNumber;
    const result = await this.usersRepository.save(newUser);
    return result;
  }
}
