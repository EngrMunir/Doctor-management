import { Request, Response } from 'express';
import status from 'http-status';
import { UserServices } from './user.service';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const email = req.user?.email;
  if (!email) throw new Error("User email is required");
  const result = await UserServices.getSingleUserFromDB(email);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User profile fetched successfully',
    data: result,
  });
});

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    specialization: req.query.specialization as string,
    hospitalName: req.query.hospitalName as string,
  };

  const result = await UserServices.getFilteredDoctors(filters);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Doctors retrieved successfully',
    data: result,
  });
});

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.params.id;
  const doctor = await UserServices.getDoctorById(doctorId); // You need to create this
  if (!doctor) throw new Error("Doctor not found");

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Doctor retrieved successfully',
    data: doctor,
  });
});


export const UserController = {
  getAllUsers,
  getMyProfile,
  getAllDoctors,
  getSingleDoctor
};
