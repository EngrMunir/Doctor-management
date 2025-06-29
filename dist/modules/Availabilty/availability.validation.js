"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAvailabilityValidationSchema = exports.createAvailabilityValidationSchema = void 0;
const zod_1 = require("zod");
exports.createAvailabilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        day: zod_1.z.string(),
        timeSlots: zod_1.z.array(zod_1.z.string().min(1)),
        serviceId: zod_1.z.string(),
    }),
});
exports.updateAvailabilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        day: zod_1.z.string().optional(),
        timeSlots: zod_1.z.array(zod_1.z.string().min(1)).optional(),
        serviceId: zod_1.z.string().optional(),
    }),
});
