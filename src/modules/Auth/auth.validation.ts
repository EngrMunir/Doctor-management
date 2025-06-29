import { z } from 'zod';

const registerDoctorValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
    role: z.literal('doctor'),
    phone: z.string({ required_error: 'Phone is required' }),
    specialization: z.string({ required_error: 'Specialization is required' }),
    hospitalName: z.string({ required_error: 'Hospital name is required' }),
    hospitalFloor: z.string({ required_error: 'Hospital floor is required' }),
  }),
});

const registerPatientValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
    role: z.literal('patient'),
    phone: z.string({ required_error: 'Phone is required' }),
    age: z.number({ required_error: 'Age is required' }),
    gender: z.enum(['male', 'female', 'other'], { required_error: 'Gender is required' }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});


export const AuthValidations = {
  registerDoctorValidationSchema,
  registerPatientValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
