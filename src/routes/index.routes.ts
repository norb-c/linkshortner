import { Router } from 'express';
import { urlContainer } from '../config/inversify.config';
import UrlController from '../controllers/UrlController';
import { routes as v1Routes } from './v1/index.routes';
import { routes as v2Routes } from './v2/index.routes';

export const routes = (): Router => {
  const router = Router();

  router.use('/api/v1', v1Routes());
  router.use('/api/v2', v2Routes());

  // base routes
  const urlController = urlContainer.get(UrlController);
  router.get('/:id', urlController.redirectToLongUrl);
  router.post('/', urlController.redirectToHome);
  router.get('/', (req, res) => res.send('URL Shortener API'));

  return router;
};
