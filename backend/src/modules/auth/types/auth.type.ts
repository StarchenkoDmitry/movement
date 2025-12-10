import {
  AuthCredential,
  AuthType,
  ProviderId,
} from 'src/entities/auth/auth-credential.entity';
import { User } from 'src/entities/user.entity';
import { OAuthProvider } from '../constants/provider.enum';

export type UserWithCredentialsResult =
  | {
      success: true;
      user: User;
      authCredential: AuthCredential;
    }
  | {
      success: false;
      error: any;
    };

export type AuthCredentialForOAuth = {
  type: AuthType.OAUTH;
  provider: OAuthProvider;
  providerId: ProviderId;
  accessToken: string;
};

export type ArgsUserWithCredentials = {};
