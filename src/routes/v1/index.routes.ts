import { Router, Response, Request } from 'express';
import { urlRoutes } from './url.routes';
import { applicationConfiguration } from '../../config';
const { nodeEnv } = applicationConfiguration;

// all v1 routes goes here
export const routes = (): Router => {
  const router = Router();

  router.use('/url', urlRoutes);

  router.get('/', (_req: Request, res: Response) => {
    res.send({ version: 'v1', environment: nodeEnv });
  });

  return router;
};
