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
import { ApiProperty } from '@nestjs/swagger';

export type UserId = string;

@Entity('users')
export class User {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  @Column({ nullable: true })
  firstName?: string;

  @ApiProperty({
    type: Date,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: AuthCredential,
  })
  @OneToOne(() => AuthCredential, (credential) => credential.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  credential: AuthCredential;

  @ApiProperty({
    type: Session,
    isArray: true,
  })
  @OneToMany(() => Session, (session) => session.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  sessions: Session[];
}
