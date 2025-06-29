import { Request, Response } from 'express';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import status from 'http-status';
import { Service } from './service.model';

// Create service
const createService = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.user?._id;
  const result = await Service.create({ ...req.body, doctorId });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

// Get own services
const getMyServices = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.user?._id;
  const result = await Service.find({ doctorId });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  });
});

// Update service
const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const doctorId = req.user?._id;

  const updated = await Service.findOneAndUpdate(
    { _id: id, doctorId },
    req.body,
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Service not found or unauthorized' });
  }

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Service updated successfully',
    data: updated,
  });
});

// Delete service
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const doctorId = req.user?._id;

  const deleted = await Service.findOneAndDelete({ _id: id, doctorId });

  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Service not found or unauthorized' });
  }

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Service deleted successfully',
    data: deleted,
  });
});

export const ServiceController = {
  createService,
  getMyServices,
  updateService,
  deleteService,
};
