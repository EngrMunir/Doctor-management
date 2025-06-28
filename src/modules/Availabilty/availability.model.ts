import { Schema, model } from 'mongoose';

const availabilitySchema = new Schema(
  {
    day: { type: String, required: true }, // e.g., "Monday"
    timeSlots: [{ type: String, required: true }], // ["10:00 - 12:00", "2:00 - 4:00"]
    doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  },
  { timestamps: true }
);

export const Availability = model('Availability', availabilitySchema);
