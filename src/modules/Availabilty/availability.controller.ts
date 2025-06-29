import { Request, Response } from 'express';
import { Availability } from './availability.model';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import status from 'http-status';

const createAvailability = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.user?._id;
  console.log(doctorId)
  const result = await Availability.create({ ...req.body, doctorId });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Availability created successfully',
    data: result,
  });
});

const getMyAvailability = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.user?._id;
  const result = await Availability.find({ doctorId }).populate('serviceId');

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Availability fetched successfully',
    data: result,
  });
});

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.user?._id;
  const { id } = req.params;

  const result = await Availability.findOneAndUpdate(
    { _id: id, doctorId },
    req.body,
    { new: true }
  );

  if (!result) {
    return res.status(404).json({ success: false, message: 'Availability not found or unauthorized' });
  }

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Availability updated successfully',
    data: result,
  });
});

const deleteAvailability = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.user?._id;
  const { id } = req.params;

  const result = await Availability.findOneAndDelete({ _id: id, doctorId });

  if (!result) {
    return res.status(404).json({ success: false, message: 'Availability not found or unauthorized' });
  }

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Availability deleted successfully',
    data: result,
  });
});

export const AvailabilityController = {
  createAvailability,
  getMyAvailability,
  updateAvailability,
  deleteAvailability,
};
