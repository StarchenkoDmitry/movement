import { randomInt } from 'node:crypto';
import {
  SESSION_COOKIE_NAME,
  SESSION_ID_LENGTH,
} from '../constants/session.constant';
import type { Request } from 'express';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CHARS_LENGTH = CHARS.length;

export function generateRandomSessionToken(): string {
  const token = new Array(SESSION_ID_LENGTH)
    .fill(0)
    .map(() => CHARS[randomInt(CHARS_LENGTH)])
    .join('');
  return token;
}

export function extractSessionIdFromRequest(req: Request): string | null {
  return req.cookies[SESSION_COOKIE_NAME] ?? null;
}
