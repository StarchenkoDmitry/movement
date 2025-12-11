import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthSessionGuard } from 'src/core/auth/auth.guard';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/core/auth/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthSessionGuard)
  @Get('me')
  findOne(@GetUser() user: User) {
    return user;
  }
}
