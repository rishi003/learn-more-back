import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly userName: string;
  @IsNotEmpty()
  readonly firstName: string;
  readonly lastName: string;
  @IsNotEmpty()
  readonly password: string;
  @IsEmail()
  readonly email: string;
}
