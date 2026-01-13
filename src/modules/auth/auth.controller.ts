import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { UserRole } from "./auth.types";

// STUDENT
export const studentSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, indexNumber } = req.body;
    const result = await authService.registerUser({
      email,
      password,
      indexNumber,
      role: UserRole.STUDENT,
    });
    res.status(201).json({ status: "success", ...result });
  } catch (err) {
    next(err);
  }
};

export const studentSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { indexNumber, password } = req.body;
    const result = await authService.loginWithIndex(indexNumber, password);
    res.status(200).json({ status: "success", ...result });
  } catch (err) {
    next(err);
  }
};

// LECTURER
export const lecturerSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await authService.registerUser({
      email,
      password,
      role: UserRole.LECTURER,
    });
    res.status(201).json({ status: "success", ...result });
  } catch (err) {
    next(err);
  }
};

export const lecturerSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginWithEmail(
      email,
      password,
      UserRole.LECTURER
    );
    res.status(200).json({ status: "success", ...result });
  } catch (err) {
    next(err);
  }
};

// SUPER ADMIN
export const superAdminSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginWithEmail(
      email,
      password,
      UserRole.SUPER_ADMIN
    );
    res.status(200).json({ status: "success", ...result });
  } catch (err) {
    next(err);
  }
};
