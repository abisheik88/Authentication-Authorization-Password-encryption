import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() userData: CreateUser) {
    return await this.userService.createUser(userData);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Post('login')
  async login(@Body() validateUser) {
    return await this.userService.validateUser(validateUser);
  }
}
