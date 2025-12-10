import { UserId } from 'src/entities/user.entity';
import { OAuthProvider } from '../constants/provider.enum';
import {
  OAuthError,
  OAuthProviderError,
  ProcessOAuthError,
} from './oauth.enum';

export interface Profile {
  [key: string]: any;
}

export type OAuthProviderSuccess = {
  success: true;

  providerId: string;
  profile: Profile;
  accessToken: string;
};

export type OAuthProviderFailure = {
  success: false;
  error: OAuthProviderError;
};

export type OAuthProviderResult = OAuthProviderSuccess | OAuthProviderFailure;

export type OAuthHandleProviderArguments = { code: string };

export type OAuthHandleProviderCallback = (
  args: OAuthHandleProviderArguments,
) => Promise<OAuthProviderResult>;

export type OAuthHandleArguments = {
  provider: OAuthProvider;
  code: string;
};

export type OAuthSuccess = {
  success: true;
  userId: UserId;
  isNewUser: boolean;
};
export type OAuthFailure = {
  success: false;
  error: OAuthError | OAuthProviderError;
};
export type OAuthResult = OAuthSuccess | OAuthFailure;

export type ProcessOAuthAndCreateSessionTokenResult =
  | {
      success: true;
      userId: UserId;
      sessionToken: string;
      isNewUser: boolean;
    }
  | {
      success: false;
      error: OAuthError | OAuthProviderError | ProcessOAuthError;
    };
