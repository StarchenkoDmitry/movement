import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthCredential } from './auth/auth-credential.entity';
import { Session } from './auth/session.entity';

export type UserId = string;

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column({ nullable: true })
  firstName?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => AuthCredential, (credential) => credential.user, { cascade: true, onDelete: 'CASCADE' })
  credential: AuthCredential;

  @OneToMany(() => Session, (session) => session.user, { cascade: true, onDelete: 'CASCADE' })
  sessions: Session[];
}
