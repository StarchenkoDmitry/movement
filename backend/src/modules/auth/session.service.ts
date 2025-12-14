import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/entities/auth/session.entity';
import { UserId } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SESSION_EXPAIRES_IN } from './constants/session.constant';
import { generateRandomSessionToken } from './utils/session.utils';

@Injectable()
export class SessionService {
  logger = new Logger(SessionService.name);

  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async findOne(sessionId: string): Promise<Session | null> {
    return await this.sessionRepository.findOneBy({ sessionId });
  }

  async create(userId: UserId): Promise<Session> {
    const expiresAt = new Date(Date.now() + SESSION_EXPAIRES_IN);
    const session = this.sessionRepository.create({
      userId,
      sessionId: generateRandomSessionToken(),
      expiresAt,
    });
    await this.sessionRepository.save(session);
    return session;
  }
}
