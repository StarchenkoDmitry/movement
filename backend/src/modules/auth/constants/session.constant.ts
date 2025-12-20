import { ONE_MINUTE } from 'src/shared/constants/time';

export const SESSION_ID_LENGTH = 64;
export const SESSION_COOKIE_NAME = 'session';
// export const SESSION_EXPAIRES_IN = ONE_MINUTE; //1m
export const SESSION_EXPAIRES_IN = 15 * ONE_MINUTE; //1m
export const SESSION_UPDATE_EXPAIRES_IN = 14 * ONE_MINUTE; //1m

export const SESSION_SYMBOL = Symbol('Session');
