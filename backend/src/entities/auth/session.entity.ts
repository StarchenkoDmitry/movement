import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User, type UserId } from '../user.entity';
import { SESSION_ID_LENGTH } from 'src/modules/auth/constants/session.constant';

@Entity('sessions')
export class Session {
  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn()
  user: User;

  @PrimaryColumn()
  userId: UserId;

  @Index({ unique: true })
  @PrimaryColumn('char', { length: SESSION_ID_LENGTH })
  sessionId: string;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
