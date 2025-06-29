"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    doctorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    patientId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Service', required: true },
    selectedDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'cancelled', 'completed'],
        default: 'pending',
    },
}, { timestamps: true });
exports.Appointment = (0, mongoose_1.model)('Appointment', appointmentSchema);
