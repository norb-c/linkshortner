import { Router, Response, Request } from 'express';
import { urlRoutes } from './url.routes';

// all v1 routes goes here
export const routes = (): Router => {
  const router = Router();

  router.use('/url', urlRoutes);

  router.get('/', (_req: Request, res: Response) => {
    res.send({ version: 'v1', environment: process.env.NODE_ENV });
  });

  return router;
};
