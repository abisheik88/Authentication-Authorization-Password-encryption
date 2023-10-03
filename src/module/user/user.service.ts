import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/createUser.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/createUser.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async getAllUser() {
    return await this.user.find();
  }
  async createUser(userData: CreateUser) {
    const { name, email, password } = userData;
    const hashPassword = await argon2.hash(password);

    const updatedUser = await this.user.create({
      name,
      email,
      password: hashPassword,
    });
    return await this.user.save(updatedUser);
  }

  async validateUser(validateData) {
    const { email, password } = validateData;
    const user = await this.user.findOne({ where: { email } });
    if (!user) {
      throw new Error('User Not Found');
    }
    const passwordValid = await argon2.verify(user.password, password);
    return passwordValid;
  }
}
