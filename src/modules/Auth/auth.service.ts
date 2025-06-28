import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";
import AppError from "../../app/errors/AppError";
import config from "../../app/config";

// Register doctor
const registerDoctor = async (payload: IUser) => {
  if (payload.role !== 'doctor') {
    throw new AppError(status.BAD_REQUEST, 'Invalid role for doctor registration');
  }

  const user = await User.isUserExistByEmail(payload?.email);
  if (user) throw new AppError(status.CONFLICT, 'User already exists!');

  return await User.create(payload);
};

// Register patient
const registerPatient = async (payload: IUser) => {
  if (payload.role !== 'patient') {
    throw new AppError(status.BAD_REQUEST, 'Invalid role for patient registration');
  }

  const user = await User.isUserExistByEmail(payload?.email);
  if (user) throw new AppError(status.CONFLICT, 'User already exists!');

  return await User.create(payload);
};

// Login user
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload?.email);
  if (!user) throw new AppError(status.NOT_FOUND, 'User not found!');

  const isPasswordCorrect = await User.isPasswordMatched(
    payload?.password,
    user?.password
  );

  if (!isPasswordCorrect) {
    throw new AppError(status.FORBIDDEN, 'Password not match!');
  }

  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    _id: user?._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string
  );

  await User.findByIdAndUpdate(user._id, { refreshToken });

  return {
    accessToken,
    refreshToken,
  };
};

// Refresh token logic
const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(status.BAD_REQUEST, 'Refresh token is required');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = decoded;
  const user = await User.isUserExistByEmail(email);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found!');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string
  );

  return {
    accessToken,
  };
};

// Logout user
const logoutUser = async (refreshToken: string) => {
  const result = await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: null },
    { new: true }
  );

  if (!result) {
    throw new AppError(status.NOT_FOUND, 'User not found during logout.');
  }

  return result;
};

export const AuthService = {
  registerDoctor,
  registerPatient,
  loginUser,
  refreshToken,
  logoutUser,
};
