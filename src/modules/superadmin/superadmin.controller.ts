import { Request, Response, NextFunction } from "express";
import * as superAdminService from "./superadmin.service";

export const getPendingLecturers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lecturers = await superAdminService.getPendingLecturers();
    res
      .status(200)
      .json({ status: "success", results: lecturers.length, data: lecturers });
  } catch (err) {
    next(err);
  }
};

export const getAllLecturers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lecturers = await superAdminService.getAllLecturers();
    res
      .status(200)
      .json({ status: "success", results: lecturers.length, data: lecturers });
  } catch (err) {
    next(err);
  }
};

export const approveLecturer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { lecturerId } = req.params;
    const lecturer = await superAdminService.approveLecturer(lecturerId);
    res.status(200).json({
      status: "success",
      message: "Lecturer approved successfully",
      data: lecturer,
    });
  } catch (err) {
    next(err);
  }
};

export const rejectLecturer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { lecturerId } = req.params;
    const result = await superAdminService.rejectLecturer(lecturerId);
    res.status(200).json({ status: "success", ...result });
  } catch (err) {
    next(err);
  }
};
