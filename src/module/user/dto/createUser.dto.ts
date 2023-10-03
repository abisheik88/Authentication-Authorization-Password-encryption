import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUser {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Exclude()
  @IsNotEmpty()
  password: string;
}
