import { Router } from 'express';
import URLController from '../../controllers/url.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import { createURLRoutesValidation } from '../../validations/urls';

const router = Router();

router.use(authMiddleware);

const urlController = new URLController();
router.post('/', createURLRoutesValidation(), urlController.createShortKey);
router.delete('/:id', urlController.deleteShortKey);

export { router as urlRoutes };
