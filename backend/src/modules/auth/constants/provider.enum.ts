export const OAuthProviders = {
  GITHUB: 'github',
  GOOGLE: 'google',
} as const;

export const oauthProviderList: OAuthProvider[] = Object.values(OAuthProviders);

export const isOAuthProvider = (provider: string): provider is OAuthProvider =>
  oauthProviderList.some((validProvider) => validProvider === provider);

export type OAuthProvider =
  (typeof OAuthProviders)[keyof typeof OAuthProviders];
