import { Schema, model } from 'mongoose';

const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, 
    doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Service = model('Service', serviceSchema);
