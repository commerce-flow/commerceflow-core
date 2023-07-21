import BaseError from './base-error';
import ERROR_CODES from './error-codes';

export class DatabaseCredentialsError extends BaseError {
  constructor(message: string) {
    super(message);
    this.severity = 'critical';
    this.code = ERROR_CODES.DATABASE.CREDENTIALS;
  }
}

export class MigrationsError extends BaseError {
  constructor(message: string) {
    super(message);
    this.severity = 'critical';
    this.code = ERROR_CODES.DATABASE.MIGRATIONS;
  }
}
