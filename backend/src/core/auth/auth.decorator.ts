import { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { SESSION_SYMBOL } from 'src/modules/auth/constants/session.constant';
import { User } from 'src/entities/user.entity';

export const GetUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext): User | User[keyof User] => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request[SESSION_SYMBOL].user;
    if (user) {
      return data ? user[data] : user;
    } else {
      throw new Error(
        'You must use AuthGuard (AuthSessionGuard) before using GetUser',
      );
    }
  },
);
