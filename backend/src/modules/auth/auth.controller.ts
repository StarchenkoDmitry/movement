import {
  Controller,
  Post,
  Param,
  Req,
  Res,
  Query,
  BadRequestException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { isOAuthProvider } from './constants/provider.enum';
import { SESSION_COOKIE_NAME } from './constants/session.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/oauth/callback/:provider')
  public async callback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
    @Param('provider') provider: string,
  ) {
    if (!isOAuthProvider(provider)) {
      throw new BadRequestException('Unknown provider');
    }

    const result = await this.authService.processOAuthAndCreateSessionToken({
      code,
      provider,
    });

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    res.cookie(SESSION_COOKIE_NAME, result.sessionToken);
  }
}
