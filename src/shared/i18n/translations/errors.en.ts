import type { StringRecord } from '../types';
import type { errorsEs } from './errors.es';

export const errorsEn: StringRecord<typeof errorsEs> = {
  UNKNOWN: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'No connection. Check your internet and try again.',
  TIMEOUT: 'The server took too long. Please try again.',
  INTERNAL_ERROR: 'Server error. We have been notified.',
  VALIDATION_ERROR: 'Check the highlighted fields.',
  UNAUTHORIZED: 'Your session ended. Please sign in again.',
  TOKEN_EXPIRED: 'Your session ended. Please sign in again.',
  FORBIDDEN: 'You are not allowed to do this.',
  NOT_FOUND: 'We could not find what you were looking for.',
  RATE_LIMITED: 'Too many attempts. Please wait a moment.',
  AUTH_INVALID_CREDENTIALS: 'Wrong email or password.',
  AUTH_EMAIL_TAKEN: 'An account with that email already exists.',
  AUTH_USERNAME_TAKEN: 'That username is already taken.',
  AUTH_INVALID_CODE: 'The code is invalid or has expired.',
};
