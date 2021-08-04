import DomainError from './DomainError';
import { Errors } from '../constants/errors';

export default class ServiceUnavailableError extends DomainError {
  protected error_name = 'service_unavailable';

  protected httpCode = 503;

  public constructor(message: string = Errors.SERVICE_UNAVAILABLE, error: Error = undefined, data: any = null, success = false) {
    super(message, error, data, success);
    Error.captureStackTrace(this, this.constructor);
  }
}
