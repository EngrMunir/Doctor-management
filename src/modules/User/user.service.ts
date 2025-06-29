import status from 'http-status';
import { User } from './user.model';
import AppError from '../../app/errors/AppError';
import { Service } from '../Doctor/service.model';

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
  serviceName?: string;
}) => {
  const query: any = { role: 'doctor' };

  if (filters.specialization) {
    query.specialization = { $regex: filters.specialization, $options: 'i' };
  }

  if (filters.hospitalName) {
    query.hospitalName = { $regex: filters.hospitalName, $options: 'i' };
  }

  let doctors = await User.find(query).select('-password -refreshToken');

  if (filters.serviceName) {
    const matchingServices = await Service.find({
      title: { $regex: filters.serviceName, $options: 'i' },
    });

    const matchingDoctorIds = matchingServices.map(s => s.doctorId?.toString());
    doctors = doctors.filter(doc => matchingDoctorIds.includes(doc._id?.toString()));
  }

  return doctors;
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
