import { randomInt } from 'node:crypto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { generateRandomSessionToken } from './utils/session.utils';
import { OAuthProvider, OAuthProviders } from './constants/provider.enum';
import {
  AuthCredential,
  AuthType,
  ProviderId,
} from 'src/entities/auth/auth-credential.entity';
import { UserId } from 'src/entities/user.entity';
import { Session } from 'src/entities/auth/session.entity';
import {
  OAuthHandleArguments,
  OAuthHandleProviderArguments,
  OAuthHandleProviderCallback,
  OAuthProviderResult,
  OAuthResult,
  ProcessOAuthAndCreateSessionTokenResult,
} from './types/oauth.type';
import { UserWithCredentialsResult } from './types/auth.type';
import {
  AccessTokenGitHub,
  AccessTokenGitHubSchema,
  GitHubUser,
  GitHubUserSchema,
} from './schemas/github.schema';
import {
  OAuthErrors,
  OAuthProviderError,
  OAuthProviderErrors,
  ProcessOAuthErrors,
} from './types/oauth.enum';
import { SESSION_EXPAIRES_IN } from './constants/session.constant';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(AuthCredential)
    private readonly authCredentialRepository: Repository<AuthCredential>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly userService: UserService,
  ) {}

  handleOAuthProviderList: Readonly<
    Partial<Record<OAuthProvider, OAuthHandleProviderCallback>>
  > = {
    [OAuthProviders.GITHUB]: this.handleOAuthGitHub.bind(this),
  };

  async createSession(userId: UserId): Promise<Session> {
    const expiresAt = new Date(Date.now() + SESSION_EXPAIRES_IN);
    const session = this.sessionRepository.create({
      userId,
      sessionToken: generateRandomSessionToken(),
      expiresAt,
    });
    return session;
  }

  async processOAuthAndCreateSessionToken(
    params: OAuthHandleArguments,
  ): Promise<ProcessOAuthAndCreateSessionTokenResult> {
    const oauthResult = await this.handleOAuth(params);

    if (!oauthResult.success)
      return {
        success: false,
        error: oauthResult.error,
      };

    const sessionToken = await this.createSession(oauthResult.userId).catch(
      (error) => {
        this.logger.error(error);
      },
    );

    if (!sessionToken)
      return {
        success: false,
        error: ProcessOAuthErrors.FAILURE_CREATING_SESSION_TOKEN,
      };

    return {
      success: true,
      userId: oauthResult.userId,
      sessionToken: sessionToken.sessionToken,
      sessionTokenExpiresAt: sessionToken.expiresAt,
      isNewUser: oauthResult.isNewUser,
    };
  }

  async handleOAuth(params: OAuthHandleArguments): Promise<OAuthResult> {
    if (!params.code) {
      return {
        success: false,
        error: OAuthErrors.CODE_NOT_PROVIDED,
      };
    }

    const handleProviderCallback =
      this.handleOAuthProviderList[params.provider];

    if (!handleProviderCallback) {
      throw new Error('Unknown provider: ' + params.provider);
    }

    const resultOAuthProvider = await handleProviderCallback({
      code: params.code,
    });

    if (!resultOAuthProvider.success) {
      return {
        success: false,
        error: resultOAuthProvider.error,
      };
    }

    const existingAuthCredential = await this.findOneAuthCredential({
      type: AuthType.OAUTH,
      providerId: resultOAuthProvider.providerId,
      provider: params.provider,
    });

    if (existingAuthCredential) {
      existingAuthCredential.accessToken = resultOAuthProvider.accessToken;
      await this.updateAuthCredential(existingAuthCredential);

      return {
        success: true,
        userId: existingAuthCredential.userId,
        isNewUser: false,
      };
    }

    const userAndAuthCredential = await this.createAuthCredentialAndUser({
      providerId: resultOAuthProvider.providerId,
      accessToken: resultOAuthProvider.accessToken,
      provider: params.provider,
    });

    if (!userAndAuthCredential.success)
      return {
        success: false,
        error: OAuthErrors.FAILURE_CREATE_AUTH_CREDENTIAL_AND_USER,
      };

    return {
      success: true,
      userId: userAndAuthCredential.user.id,
      isNewUser: true,
    };
  }

  async findOneAuthCredential({
    providerId,
    provider,
    type,
  }: {
    providerId: ProviderId;
    provider: OAuthProvider;
    type: AuthType.OAUTH;
  }) {
    return await this.authCredentialRepository.findOne({
      where: {
        providerId,
        provider,
        type,
      },
    });
  }

  async updateAuthCredential(authCredential: AuthCredential) {
    return await this.authCredentialRepository.save(authCredential);
  }

  async createAuthCredentialAndUser(
    {
      providerId,
      accessToken,
      provider,
    }: {
      providerId: ProviderId;
      provider: OAuthProvider;
      accessToken: string;
    },
    tx?: EntityManager,
  ): Promise<UserWithCredentialsResult> {
    return await this.authCredentialRepository.manager
      .transaction(async (tx) => {
        const user = await this.userService.create(
          {
            firstName: '' + randomInt(1000000),
          },
          tx,
        );

        const authCredential = this.authCredentialRepository.create({
          type: AuthType.OAUTH,
          provider,
          providerId,
          accessToken,
          user,
        });
        await this.authCredentialRepository.save(authCredential);

        return {
          success: true,
          user,
          authCredential,
        } as const;
      })
      .catch((error) => {
        return { success: false, error };
      });
  }

  async handleOAuthGitHub({
    code,
  }: OAuthHandleProviderArguments): Promise<OAuthProviderResult> {
    const accessTokenResult = await this.fetchAccessTokenGitHub(code);

    if (!accessTokenResult.success)
      return {
        success: false,
        error: OAuthProviderErrors.FAILURE_FETCHING_ACCESS_TOKEN,
      };

    const githubUserResult = await this.fetchUserGitHub(
      accessTokenResult.accessToken.access_token,
    );

    if (!githubUserResult.success)
      return {
        success: false,
        error: OAuthProviderErrors.FAILURE_FETCHING_USER_DATA,
      };

    return {
      success: true,
      providerId: githubUserResult.providerId,
      profile: githubUserResult.profile,
      accessToken: accessTokenResult.accessToken.access_token,
    };
  }

  async fetchUserGitHub(accessToken: string): Promise<
    | {
        success: true;
        profile: GitHubUser;
        providerId: ProviderId;
      }
    | {
        success: false;
        error: OAuthProviderError;
      }
  > {
    const result = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const rawProfile = await result.json().catch(() => null);

    if (!rawProfile) {
      return {
        success: false,
        error: OAuthProviderErrors.FAILURE_FETCHING_USER_DATA,
      };
    }

    const githubUser = GitHubUserSchema.safeParse(rawProfile);

    if (githubUser.success) {
      return {
        success: true,
        profile: githubUser.data,
        providerId: githubUser.data.id,
      };
    }

    return {
      success: false,
      error: OAuthProviderErrors.FAILURE_FETCHING_USER_DATA,
    };
  }

  async fetchAccessTokenGitHub(code: string): Promise<
    | {
        success: true;
        accessToken: AccessTokenGitHub;
      }
    | {
        success: false;
      }
  > {
    const formData = new FormData();
    formData.append('client_id', process.env.OAUTH_GITHUB_CLIENT_ID!);
    formData.append('client_secret', process.env.OAUTH_GITHUB_CLIENT_SECRET!);
    formData.append('code', code);

    const resultFetch = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      },
    );

    const rawAccessToken = await resultFetch.json().catch(() => null);

    const resultParse = AccessTokenGitHubSchema.safeParse(rawAccessToken);

    if (resultParse.success) {
      return {
        success: true,
        accessToken: resultParse.data,
      };
    }

    return {
      success: false,
    };
  }
}
