"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentStatusSchema = exports.bookAppointmentValidationSchema = void 0;
const zod_1 = require("zod");
exports.bookAppointmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        doctorId: zod_1.z.string(),
        serviceId: zod_1.z.string(),
        selectedDate: zod_1.z.string(),
        timeSlot: zod_1.z.string(),
    }),
});
exports.updateAppointmentStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['pending', 'accepted', 'cancelled', 'completed']),
    }),
});
