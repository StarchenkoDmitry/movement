import z from 'zod';

export const AccessTokenGitHubSchema = z.object({
  access_token: z.string().nonempty(),
  token_type: z.literal('bearer'),
  scope: z.string().nonempty(),
});

export const GitHubUserSchema = z.object({
  id: z.bigint({ coerce: true }).transform((id) => id.toString()),
});

export type AccessTokenGitHub = z.infer<typeof AccessTokenGitHubSchema>;
export type GitHubUser = z.infer<typeof GitHubUserSchema>;
