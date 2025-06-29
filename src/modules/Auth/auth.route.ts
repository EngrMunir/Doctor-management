import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';
import validateRequest from '../../app/middleware/validateRequest';

const router = express.Router();

// Doctor registration
router.post(
  '/register-doctor',
  AuthControllers.registerDoctor
);

// Patient registration
router.post(
  '/register-patient',
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
