import express from 'express';
import { ServiceController } from './service.controller';
import {
  createServiceValidationSchema,
  updateServiceValidationSchema,
} from './service.validation';
import validateRequest from '../../app/middleware/validateRequest';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.doctor), ServiceController.getMyServices);
router.post(
  '/',
  auth(USER_ROLE.doctor),
  validateRequest(createServiceValidationSchema),
  ServiceController.createService
);
router.patch(
  '/:id',
  auth(USER_ROLE.doctor),
  validateRequest(updateServiceValidationSchema),
  ServiceController.updateService
);
router.delete('/:id',auth(USER_ROLE.doctor), ServiceController.deleteService);

export const ServiceRoutes = router;
