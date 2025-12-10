import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredential } from 'src/entities/auth/auth-credential.entity';
import { User } from 'src/entities/user.entity';
import { Session } from 'src/entities/auth/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthCredential, User, Session]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
