import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/entities/auth/session.entity';
import { Repository } from 'typeorm';

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
}
