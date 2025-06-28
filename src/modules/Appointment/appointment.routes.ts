import express from 'express';
import { AppointmentController } from './appointment.controller';
import { verifyJWT, requireRole } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  bookAppointmentValidationSchema,
  updateAppointmentStatusSchema,
} from './appointment.validation';

const router = express.Router();

// Patient routes
router.post(
  '/',
  verifyJWT,
  requireRole('patient'),
  validateRequest(bookAppointmentValidationSchema),
  AppointmentController.bookAppointment
);

router.get(
  '/patient',
  verifyJWT,
  requireRole('patient'),
  AppointmentController.getMyAppointments
);

// Doctor routes
router.get(
  '/doctor',
  verifyJWT,
  requireRole('doctor'),
  AppointmentController.getDoctorAppointments
);

router.patch(
  '/doctor/:id/status',
  verifyJWT,
  requireRole('doctor'),
  validateRequest(updateAppointmentStatusSchema),
  AppointmentController.updateAppointmentStatus
);

export const AppointmentRoutes = router;
