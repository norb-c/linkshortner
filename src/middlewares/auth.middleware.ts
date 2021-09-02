import { NextFunction, Request, Response } from 'express';
import { Errors } from '../common/errors';
import { AuthenticationError } from '../exceptions';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers;

  try {
    if (headers && headers.secret_key) {
      const apiKey: string = process.env.API_KEY;
      const secret = headers.secret_key as string;

      if (apiKey !== secret) {
        throw new AuthenticationError(Errors.INVALID_AUTHORIZATION_TOKEN);
      }
      next();
    } else {
      throw new AuthenticationError(Errors.INVALID_AUTHORIZATION_TOKEN);
    }
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;
