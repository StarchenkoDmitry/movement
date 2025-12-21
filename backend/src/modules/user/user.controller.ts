import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthSessionGuard } from 'src/core/auth/auth.guard';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/core/auth/auth.decorator';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { SESSION_COOKIE_NAME } from '../auth/constants/session.constant';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiSecurity(SESSION_COOKIE_NAME)
  @ApiResponse({ status: 200, description: 'User data.' })
  @UseGuards(AuthSessionGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return user;
  }
  
  @ApiSecurity(SESSION_COOKIE_NAME)
  @Post('me')
  @UseGuards(AuthSessionGuard)
  async update(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.update(user.id, updateUserDto);
    return result;
  }
}
