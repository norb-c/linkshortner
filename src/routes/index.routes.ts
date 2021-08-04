import { Router } from 'express';
import URLController from '../controllers/url.controller';
import { routes as v1Routes } from './v1/index.routes';
import { routes as v2Routes } from './v2/index.routes';

export const routes = (): Router => {
  const router = Router();

  router.use('/api/v1', v1Routes());
  router.use('/api/v2', v2Routes());

  // base routes
  router.get('/:id', new URLController().redirectToLongUrl);
  router.post('/', new URLController().redirectToHome);

  return router;
};
