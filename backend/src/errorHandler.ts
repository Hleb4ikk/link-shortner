import { NextFunction, Request, Response } from 'express';
import {
  HttpException,
  InternalServerErrorException,
} from 'types/exceptions/HttpExceptions';

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const error = !(err instanceof HttpException)
    ? new InternalServerErrorException(err.message)
    : err;
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
    description: error.description,
  });

  next();
}
