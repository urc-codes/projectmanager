import { Request, Response, NextFunction } from "express";
import { AppError } from "../libs/appError";
import logger from "../libs/logger";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "MongoServerError" && err.code === 11000) {
    err = new AppError("Duplicate field value entered", 400);
  }

  if (!err.isOperational) {
    logger.error("UNKNOWN ERROR", err);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
