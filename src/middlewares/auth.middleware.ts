import { NextFunction, Response } from 'express';
import { Errors } from '../constants/errors';
import { AuthenticationError } from '../exceptions';
import { RequestWithUser } from '../interfaces/auth.interface';

async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const headers = req.headers;

  try {
    if (headers && headers.secret_key) {
      const apiKey: string = process.env.API_KEY;
      const secret: string = headers.secret_key;

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
