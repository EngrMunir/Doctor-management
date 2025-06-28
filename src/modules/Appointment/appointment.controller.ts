import { Request, Response } from 'express';
import { Appointment } from './appointment.model';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import status from 'http-status';

// Book appointment (patient)
const bookAppointment = catchAsync(async (req: Request, res: Response) => {
  const patientId = req.user?._id;

  const exists = await Appointment.findOne({
    doctorId: req.body.doctorId,
    selectedDate: req.body.selectedDate,
    timeSlot: req.body.timeSlot,
    status: { $in: ['pending', 'accepted'] },
  });

  if (exists) {
    return res.status(400).json({ success: false, message: 'Time slot already booked' });
  }

  const result = await Appointment.create({ ...req.body, patientId });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Appointment booked successfully',
    data: result,
  });
});

// View my appointments (patient)
const getMyAppointments = catchAsync(async (req: Request, res: Response) => {
  const patientId = req.user?._id;

  const result = await Appointment.find({ patientId })
    .populate('doctorId')
    .populate('serviceId');

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Appointments fetched',
    data: result,
  });
});

// View doctor's appointments
const getDoctorAppointments = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.user?._id;
  const statusFilter = req.query.status;

  const filter: any = { doctorId };
  if (statusFilter) filter.status = statusFilter;

  const result = await Appointment.find(filter).populate('patientId').populate('serviceId');

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Doctor appointments fetched',
    data: result,
  });
});

// Update appointment status (doctor)
const updateAppointmentStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const doctorId = req.user?._id;

  const result = await Appointment.findOneAndUpdate(
    { _id: id, doctorId },
    { status: req.body.status },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({ success: false, message: 'Appointment not found or unauthorized' });
  }

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Appointment status updated',
    data: result,
  });
});

export const AppointmentController = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
};
