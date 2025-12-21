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
  @ApiResponse({ status: 200, description: 'User data.', type: User })
  // @ApiResponse({ status: 201, description: 'User data2.',type: User, isArray: true })
  // @ApiResponse({ status: 200, description: 'User data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.', type: Number })
  @UseGuards(AuthSessionGuard)
  @Get('me')
  async me(@GetUser() user: User): Promise<User> {
    return user;
  }

  @ApiSecurity(SESSION_COOKIE_NAME)
  @ApiResponse({ status: 200, description: 'Updated user.', type: User })
  @Post('me')
  @UseGuards(AuthSessionGuard)
  async updateName(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const result = await this.userService.update(user.id, updateUserDto);
    return result;
  }
}
