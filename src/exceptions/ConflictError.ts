import DomainError from './DomainError';
import { Errors } from '../constants/errors';

export default class ConflictError extends DomainError {
  protected error_name = 'conflict';

  protected httpCode = 409;

  public constructor(message: string = Errors.CONFLICT, error: Error = undefined, data: any = null, success = false) {
    super(message, error, data, success);
    Error.captureStackTrace(this, this.constructor);
  }
}
