import { Router } from 'express';
import { urlContainer } from '../../config/inversify.config';
import UrlController from '../../controllers/UrlController';
import authMiddleware from '../../middlewares/auth.middleware';
import { validateSchema } from '../../middlewares/validator.middleware';
import { createUrlSchema, deleteUrlSchema } from '../../validations/urlSchema';

const router = Router();

router.use(authMiddleware);

const urlController = urlContainer.get(UrlController);

router.post('/', validateSchema(createUrlSchema), urlController.createShortKey);
router.delete('/:id', validateSchema(deleteUrlSchema), urlController.deleteShortKey);

export { router as urlRoutes };
