import { ONE_MINUTE, ONE_SECOND } from 'src/shared/constants/time';

export const SESSION_ID_LENGTH = 64;
export const SESSION_COOKIE_NAME = 'session';
export const SESSION_EXPAIRES_IN = ONE_MINUTE; //1m
// That is the time after which the refresh token expires
export const REFRESH_SESSION_EXPIRES_IN = 30 * ONE_SECOND; //30s

export const SESSION_SYMBOL = Symbol('Session');
