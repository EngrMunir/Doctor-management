import status from 'http-status';
import { AuthService } from './auth.service';
import { catchAsync } from '../../app/utils/catchAsync';
import config from '../../app/config';
import sendResponse from '../../app/utils/sendResponse';
import { Request, Response } from 'express';

// Doctor registration
const registerDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerDoctor(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Doctor registered successfully!',
    data: result,
  });
});

// Patient registration
const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerPatient(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Patient registered successfully!',
    data: result,
  });
});

// Login
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User logged in successfully!',
    data: { accessToken },
  });
});

// Refresh Token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new Error('Refresh token is missing!');
  }

  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Access token refreshed successfully!',
    data: result,
  });
});

// Logout
const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: 'Refresh token not found',
      data: null,
    });
  }

  await AuthService.logoutUser(refreshToken);

  res.clearCookie('refreshToken', {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User logged out successfully!',
    data: null,
  });
});

export const AuthControllers = {
  registerDoctor,
  registerPatient,
  loginUser,
  refreshToken,
  logoutUser,
};
