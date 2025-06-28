import express from 'express';
import { AvailabilityController } from './availability.controller';
import { verifyJWT, requireRole } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createAvailabilityValidationSchema,
  updateAvailabilityValidationSchema,
} from './availability.validation';

const router = express.Router();

router.use(verifyJWT, requireRole('doctor'));

router.post(
  '/',
  validateRequest(createAvailabilityValidationSchema),
  AvailabilityController.createAvailability
);

router.get('/', AvailabilityController.getMyAvailability);

router.patch(
  '/:id',
  validateRequest(updateAvailabilityValidationSchema),
  AvailabilityController.updateAvailability
);

router.delete('/:id', AvailabilityController.deleteAvailability);

export const AvailabilityRoutes = router;
