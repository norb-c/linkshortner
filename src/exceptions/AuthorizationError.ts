import DomainError from './DomainError';
import { Errors } from '../constants/errors';

export default class AuthorizationError extends DomainError {
  protected error_name = 'not_authorized';

  protected httpCode = 403;

  public constructor(message: string = Errors.NOT_AUTHORIZED, error: Error = undefined, data: any = null, success = false) {
    super(message, error, data, success);
    Error.captureStackTrace(this, this.constructor);
  }
}
