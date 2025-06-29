"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const registerDoctorValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        role: zod_1.z.literal('doctor'),
        phone: zod_1.z.string({ required_error: 'Phone is required' }),
        specialization: zod_1.z.string({ required_error: 'Specialization is required' }),
        hospitalName: zod_1.z.string({ required_error: 'Hospital name is required' }),
        hospitalFloor: zod_1.z.string({ required_error: 'Hospital floor is required' }),
    }),
});
const registerPatientValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        role: zod_1.z.literal('patient'),
        phone: zod_1.z.string({ required_error: 'Phone is required' }),
        age: zod_1.z.number({ required_error: 'Age is required' }),
        gender: zod_1.z.enum(['male', 'female', 'other'], { required_error: 'Gender is required' }),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh token is required' }),
    }),
});
exports.AuthValidations = {
    registerDoctorValidationSchema,
    registerPatientValidationSchema,
    loginValidationSchema,
    refreshTokenValidationSchema,
};
