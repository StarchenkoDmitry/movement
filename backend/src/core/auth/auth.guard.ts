import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { SessionService } from 'src/modules/auth/session.service';
import { UserService } from 'src/modules/user/user.service';
import { extractSessionIdFromRequest } from 'src/modules/auth/utils/session.utils';
import { SESSION_SYMBOL } from 'src/modules/auth/constants/session.constant';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const sessionId = extractSessionIdFromRequest(request);

    if (!sessionId) {
      throw new UnauthorizedException('No token');
    }

    const session = await this.sessionService.findOne(sessionId);

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    if (session.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Session expired');
    }

    const user = this.userService.findOne(session.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request[SESSION_SYMBOL] = {
      session,
      user,
    };

    return true;
  }
}
