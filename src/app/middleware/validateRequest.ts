import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const firstMessage = error.errors[0]?.message || 'Invalid request data';
        next(new AppError(httpStatus.BAD_REQUEST, firstMessage));
      } else {
        next(error);
      }
    }
  };
};

export default validateRequest;
