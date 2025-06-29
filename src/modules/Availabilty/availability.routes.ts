import express from 'express';
import { AvailabilityController } from './availability.controller';
import {
  createAvailabilityValidationSchema,
  updateAvailabilityValidationSchema,
} from './availability.validation';
import validateRequest from '../../app/middleware/validateRequest';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.doctor),
  validateRequest(createAvailabilityValidationSchema),
  AvailabilityController.createAvailability
);

router.get('/',auth(USER_ROLE.doctor), AvailabilityController.getMyAvailability);

router.patch(
  '/:id',
  validateRequest(updateAvailabilityValidationSchema),
  AvailabilityController.updateAvailability
);

router.delete('/:id', AvailabilityController.deleteAvailability);

export const AvailabilityRoutes = router;
