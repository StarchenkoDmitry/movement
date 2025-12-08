import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUserDto extends PickType(User, ['firstName'] as const) {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  firstName: string;
}
