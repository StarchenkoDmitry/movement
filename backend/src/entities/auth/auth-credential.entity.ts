// <! -- prettier-ignore -->
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user.entity';
import type { UserId } from '../user.entity';

export enum AuthType {
  EMAIL = 'email',
  PHONE = 'phone',
  OAUTH = 'oauth',
}

export type AuthCredentialId = number; 
export type ProviderId = string; 

// AuthCredential = Authentication Credential
@Entity('auth_credentials')
@Index('idx_email_unique', ['email'], { where: `"type" = 'email'`, unique: true }) // Partial unique index для email
@Index('idx_phone_unique', ['phone'], { where: `"type" = 'phone'`, unique: true }) // Partial unique index для phone
@Index('idx_oauth_unique', ['provider', 'providerId'], { where: `"type" = 'oauth'`, unique: true }) // Unique для OAuth (provider + id)
export class AuthCredential {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: AuthCredentialId;

  @Column({ type: 'enum', enum: AuthType })
  type: AuthType;

  @Column({ nullable: true })
  email?: string; // Для type = 'email'

  @Column({ nullable: true })
  passwordHash?: string; // Для type = 'email' (хеш пароля, используйте bcrypt)

  @Column({ nullable: true })
  phone?: string; // Для type = 'phone' (формат E.164, например +1234567890)

  @Column({ nullable: true })
  provider?: string; // Для type = 'oauth' (например, 'google', 'facebook')

  @Column({
    nullable: true,
    type: 'bigint',
  })
  providerId?: ProviderId; // ID пользователя от провайдера

  @Column({ nullable: true, type: 'jsonb' })
  profile?: object; // Or a specific interface/type if you have a known structure

  @Column({ nullable: true, type: 'jsonb' })
  access?: object;

  @Column({ nullable: true })
  accessToken?: string; // Для OAuth

  @Column({ nullable: true })
  refreshToken?: string; // Для OAuth

  @Column({ nullable: true })
  tokenExpiry?: Date; // Для OAuth

  @OneToOne(() => User, (user) => user.credential, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  userId: UserId; // Foreign key
}
