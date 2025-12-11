import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { SessionStrategy } from './strategies/session.strategy';

import { User } from 'src/entities/user.entity';
import { Session } from 'src/entities/auth/session.entity';
import { AuthCredential } from 'src/entities/auth/auth-credential.entity';
import { AuthSessionGuard } from 'src/core/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthCredential, User, Session]),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SessionService,
    SessionStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthSessionGuard,
    },
  ],
  exports: [AuthService, SessionService],
})
export class AuthModule {}
