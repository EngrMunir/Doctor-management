import express from 'express';
import { ServiceController } from './service.controller';
import { verifyJWT, requireRole } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createServiceValidationSchema,
  updateServiceValidationSchema,
} from './service.validation';

const router = express.Router();

// Must be logged in as a doctor
router.use(verifyJWT, requireRole('doctor'));

router.get('/', ServiceController.getMyServices);
router.post(
  '/',
  validateRequest(createServiceValidationSchema),
  ServiceController.createService
);
router.patch(
  '/:id',
  validateRequest(updateServiceValidationSchema),
  ServiceController.updateService
);
router.delete('/:id', ServiceController.deleteService);

export const ServiceRoutes = router;
