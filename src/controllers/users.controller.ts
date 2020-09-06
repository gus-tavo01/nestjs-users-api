import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Res,
  HttpStatus,
  Delete,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpApiResponse } from '../common/http-api-response';
import { UsersService } from 'src/services/user.service';
import { CreateUserDto } from 'src/dtos/create-user-dto';
import { PatchUserDto } from 'src/dtos/patch-user-dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get by filters

  @Get('/:id')
  public async get(@Param() params, @Res() res: Response) {
    const id = Number(params.id);
    const foundUser = await this.usersService.getById(id);

    if (!foundUser) {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ result: null, statusCode: HttpStatus.NOT_FOUND });
      return res;
    }

    res
      .status(HttpStatus.OK)
      .json({ result: foundUser, statusCode: HttpStatus.OK });
    return res;
  }

  // @Put

  @Post()
  public async create(
    @Body() userDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      // TODO
      // validate if user exist?
      const result = await this.usersService.create(userDto);
      response
        .status(HttpStatus.CREATED)
        .json({ result, statusCode: HttpStatus.CREATED });
      return response;
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error, statusCode: HttpStatus.INTERNAL_SERVER_ERROR });
      return response;
    }
  }

  @Delete('/:id')
  public async delete(@Param() params, @Res() res: Response) {
    try {
      // find user
      // validate if exist
      const userId = Number(params.id);
      // validate if exist
      const foundUser = await this.usersService.getById(userId);
      if (!foundUser) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ result: null, statusCode: HttpStatus.NOT_FOUND });
        return res;
      }
      const deleteUserResponse = await this.usersService.remove(userId);

      if (deleteUserResponse <= 0) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          result: foundUser,
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        });
        return res;
      }

      res
        .status(HttpStatus.OK)
        .json({ result: foundUser, statusCode: HttpStatus.OK });
      return res;
    } catch (error) {
      // send 500 error
    }
  }

  @Patch('/:id')
  public async patch(
    @Param() params,
    @Body() userDto: PatchUserDto,
    @Res() res: Response,
  ) {
    const userId = Number(params.id);
    // validate if exist
    const foundUser = await this.usersService.getById(userId);
    if (!foundUser) {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ result: null, statusCode: HttpStatus.NOT_FOUND });
      return res;
    }

    const result = await this.usersService.patch(userId, userDto);

    if (result <= 0) {
      res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ result: null, statusCode: HttpStatus.UNPROCESSABLE_ENTITY });
      return res;
    }

    const user = await this.usersService.getById(userId);
    res.status(HttpStatus.OK).json({ result: user, statusCode: HttpStatus.OK });
    return res;
  }
}
