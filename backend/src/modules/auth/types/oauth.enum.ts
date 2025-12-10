export const OAuthErrors = {
  CODE_NOT_PROVIDED: 'code-not-provided',
  UNKNOWN_ERROR: 'unknown-error',
  FAILURE_CREATE_AUTH_CREDENTIAL_AND_USER:
    'failure-create-auth-credential-and-user',
} as const;
export type OAuthError = (typeof OAuthErrors)[keyof typeof OAuthErrors];

export const OAuthProviderErrors = {
  FAILURE_FETCHING_ACCESS_TOKEN: 'failure-fetching-access-token',
  FAILURE_FETCHING_USER_DATA: 'failure-fetching-user-data',
} as const;
export type OAuthProviderError =
  (typeof OAuthProviderErrors)[keyof typeof OAuthProviderErrors];

export const ProcessOAuthErrors = {
  FAILURE_CREATING_SESSION_TOKEN: 'failure-creating-session-token',
} as const;
export type ProcessOAuthError =
  (typeof ProcessOAuthErrors)[keyof typeof ProcessOAuthErrors];
