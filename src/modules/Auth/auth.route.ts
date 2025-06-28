import express from 'express';
import { AuthControllers } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';

const router = express.Router();

// Doctor registration
router.post(
  '/register-doctor',
  validateRequest(AuthValidations.registerDoctorValidationSchema),
  AuthControllers.registerDoctor
);

// Patient registration
router.post(
  '/register-patient',
  validateRequest(AuthValidations.registerPatientValidationSchema),
  AuthControllers.registerPatient
);

// Login
router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser
);

// Refresh token
router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

// Logout
router.post('/logout', AuthControllers.logoutUser);

export const AuthRoutes = router;
