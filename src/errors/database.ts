import BaseError from './base-error';
import ERROR_CODES from './error-codes';

export default class DatabaseCredentialsError extends BaseError {
  constructor(message: string) {
    super(message);
    this.code = ERROR_CODES.DATABASE.CREDENTIALS;
  }
}
