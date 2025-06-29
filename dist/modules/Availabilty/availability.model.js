"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Availability = void 0;
const mongoose_1 = require("mongoose");
const availabilitySchema = new mongoose_1.Schema({
    day: { type: String, required: true }, // e.g., "Monday"
    timeSlots: [{ type: String, required: true }], // ["10:00 - 12:00", "2:00 - 4:00"]
    doctorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Service', required: true },
}, { timestamps: true });
exports.Availability = (0, mongoose_1.model)('Availability', availabilitySchema);
