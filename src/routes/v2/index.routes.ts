import { Router, Response, Request } from 'express';
import { applicationConfiguration } from '../../config';
const { nodeEnv } = applicationConfiguration;

// all v2 routes goes here
export const routes = (): Router => {
  const router = Router();

  router.get('/', (_req: Request, res: Response) => {
    res.send({ version: 'v2', environment: nodeEnv });
  });

  return router;
};
