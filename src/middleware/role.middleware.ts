import { Request, Response, NextFunction } from "express";
import { AppError } from "../libs/appError";
import { UserRole } from "../modules/auth/auth.types";

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
