import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import type { Request, Response } from 'express';

import { SessionService } from '../session.service';
import { UserService } from 'src/modules/user/user.service';

import { extractSessionIdFromRequest } from '../utils/session.utils';
import {
  SESSION_COOKIE_NAME,
  SESSION_SYMBOL,
} from '../constants/session.constant';

@Injectable()
export class SessionStrategy extends PassportStrategy(
  Strategy,
  'custom-session',
) {
  logger = new Logger(SessionStrategy.name);

  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }

  async authenticate(req: Request, options?: any) {
    try {
      const sessionId = extractSessionIdFromRequest(req);

      if (!sessionId) {
        return this.error(new UnauthorizedException('No token'));
      }

      this.logger.debug(`sessionId: ${sessionId}`);

      const session = await this.sessionService.findOne(sessionId);

      if (!session) {
        return this.error(new UnauthorizedException('Session not found'));
      }

      if (session.expiresAt.getTime() < Date.now()) {
        return this.error(new UnauthorizedException('Session expired'));
      }

      const user = await this.userService.findOne(session.userId);

      if (!user) {
        return this.error(new UnauthorizedException('User not found'));
      }

      req[SESSION_SYMBOL] = {
        session,
        user,
      };

      const needToRefreshSession =
        await this.sessionService.refreshSession(session);
      this.logger.debug('needToRefreshSession', needToRefreshSession);
      if (needToRefreshSession.needToRefresh) {
        const res = req.res;
        if (!res) {
          throw new Error('res not found in req object');
        }

        this.logger.debug('Refreshed session', needToRefreshSession.session);

        res.cookie(SESSION_COOKIE_NAME, session.sessionId, {
          expires: session.expiresAt,
        });
      }

      return this.success(user);
    } catch (err) {
      return this.error(err);
    }
  }
}
