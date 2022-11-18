import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import { Errors } from '../common/errors';
import DomainError from '../exceptions/DomainError';
import { CelebrateError } from 'celebrate';
import logger from '../common/logger';

function handleErrors(err: Error, _req: Request, res: Response, _next: NextFunction): Response {
  res.err = err;
  if (err instanceof DomainError) {
    return res.status(err.getHttpCode()).send({
      status: err.getStatus(),
      error: err.getName(),
      message: err.message,
      data: err.getData ? err.getData() || {} : {}
    });
  }

  if (err instanceof ValidationError) {
    logger.error('[Database Validation Error] => ', err);
  }

  if (err instanceof SyntaxError) {
    logger.error('[Database Validation Error] => ', err);

    return res.status(400).send({
      status: false,
      error: 'syntax_error',
      message: 'Bad request',
      data: {}
    });
  }

  if (err instanceof CelebrateError) {
    const messageArr: any = [];
    err.details.forEach(x => {
      return x.details.map(c => messageArr.push(c.message.replace(/["]+/g, '')));
    });

    return res.status(400).send({
      status: false,
      error: 'validation_error',
      message: messageArr.join(', '),
      data: {}
    });
  }

  return res.status(500).send({
    status: false,
    error: 'server_error',
    message: Errors.SERVER_ERROR,
    data: {}
  });
}

export { handleErrors };
