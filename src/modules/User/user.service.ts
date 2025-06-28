import status from 'http-status';
import { User } from './user.model';
import AppError from '../../app/errors/AppError';

const getSingleUserFromDB = async (userEmail: string) => {
  const result = await User.findOne({ email: userEmail }).select('-password -refreshToken');

  if (!result) throw new AppError(status.NOT_FOUND, 'User not found');

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select('-password -refreshToken');
  return result;
};

const getAllDoctors = async () => {
  const result = await User.find({ role: 'doctor' }).select('-password -refreshToken');
  return result;
};

const getFilteredDoctors = async (filters: {
  specialization?: string;
  hospitalName?: string;
}) => {
  const query: any = { role: 'doctor' };

  if (filters.specialization) {
    query.specialization = filters.specialization;
  }

  if (filters.hospitalName) {
    query.hospitalName = filters.hospitalName;
  }

  const result = await User.find(query).select('-password -refreshToken');
  return result;
};

const getDoctorById = async (doctorId: string) => {
  const result = await User.findOne({
    _id: doctorId,
    role: 'doctor',
  }).select('-password -refreshToken');

  return result;
};


export const UserServices = {
  getSingleUserFromDB,
  getAllUsersFromDB,
  getAllDoctors,
  getFilteredDoctors,
  getDoctorById
};
