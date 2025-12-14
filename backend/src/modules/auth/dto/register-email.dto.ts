import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class RegisterEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;
}
