import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class RegisterEmailDto {
  @ApiProperty({
    type: String
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @MinLength(4)
  password: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  firstName?: string;
}
