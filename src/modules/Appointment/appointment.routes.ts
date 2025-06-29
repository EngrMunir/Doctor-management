import express from 'express';
import { AppointmentController } from './appointment.controller';
import {
  bookAppointmentValidationSchema,
  updateAppointmentStatusSchema,
} from './appointment.validation';
import validateRequest from '../../app/middleware/validateRequest';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

// Patient routes
router.post(
  '/',
  auth(USER_ROLE.patient),
  validateRequest(bookAppointmentValidationSchema),
  AppointmentController.bookAppointment
);

router.get(
  '/patient',
  auth(USER_ROLE.patient),
  AppointmentController.getMyAppointments
);

// Doctor routes
router.get(
  '/doctor',
  auth(USER_ROLE.doctor),
  AppointmentController.getDoctorAppointments
);

router.patch(
  '/doctor/:id/status',
  auth(USER_ROLE.doctor, USER_ROLE.admin),
  validateRequest(updateAppointmentStatusSchema),
  AppointmentController.updateAppointmentStatus
);

export const AppointmentRoutes = router;
