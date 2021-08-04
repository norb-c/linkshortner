import { Router, Response, Request } from 'express';

// all v2 routes goes here
export const routes = (): Router => {
  const router = Router();

  router.get('/', (_req: Request, res: Response) => {
    res.send({ version: 'v2', environment: process.env.NODE_ENV });
  });

  return router;
};
