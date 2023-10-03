import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUser {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @Exclude()
  password: string;
}
