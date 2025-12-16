import {
  Controller,
  Post,
  Param,
  Res,
  Query,
  BadRequestException,
  Body,
  HttpCode,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { isOAuthProvider } from './constants/provider.enum';
import { SESSION_COOKIE_NAME } from './constants/session.constant';
import { Public } from 'src/core/auth/public.decorator';
import { RegisterEmailDto } from './dto/register-email.dto';
import { SessionService } from './session.service';

@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Public()
  @HttpCode(201)
  @Post('/oauth/callback/:provider')
  public async callback(
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

    res.cookie(SESSION_COOKIE_NAME, result.sessionToken, {
      expires: result.sessionTokenExpiresAt,
    });
  }

  @Public()
  @HttpCode(201)
  @Post('/register/email')
  public async registerWithEmail(
    @Res({ passthrough: true }) res: Response,
    @Body() registerEmailDto: RegisterEmailDto,
  ) {
    const userResult =
      await this.authService.registerWithEmail(registerEmailDto);

    if (!userResult.success) {
      this.logger.log(userResult.error);
      throw new BadRequestException('Failed to register user');
    }

    const session = await this.sessionService.create(userResult.user.id);

    res.cookie(SESSION_COOKIE_NAME, session.sessionId, {
      expires: session.expiresAt,
    });
  }
}
