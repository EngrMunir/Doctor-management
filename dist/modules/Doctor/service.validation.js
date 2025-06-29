"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceValidationSchema = exports.createServiceValidationSchema = void 0;
const zod_1 = require("zod");
exports.createServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number(),
        duration: zod_1.z.number(),
    }),
});
exports.updateServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        duration: zod_1.z.number().optional(),
    }),
});
