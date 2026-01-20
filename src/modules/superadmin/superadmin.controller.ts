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

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const students = await superAdminService.getAllStudents();
    res
      .status(200)
      .json({ status: "success", results: students.length, data: students });
  } catch (err) {
    next(err);
  }
};

export const getApprovedStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const submissions =
      await superAdminService.getStudentsWithApprovedProjects();
    res.status(200).json({
      status: "success",
      results: submissions.length,
      data: submissions,
    });
  } catch (err) {
    next(err);
  }
};

export const getRejectedSubmissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const submissions = await superAdminService.getRejectedSubmissions();
    res.status(200).json({
      status: "success",
      results: submissions.length,
      data: submissions,
    });
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

export const reassignSupervisor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { submissionId } = req.params;
    const { newSupervisorId } = req.body;
    const data = await superAdminService.reassignSupervisor(
      submissionId,
      newSupervisorId,
    );
    res.status(200).json({
      status: "success",
      message: "Supervisor reassigned successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getWindowStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await superAdminService.getWindowStatus();
    res.status(200).json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

export const toggleWindow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { isOpen } = req.body;
    const data = await superAdminService.setWindowStatus(isOpen);
    res.status(200).json({
      status: "success",
      message: `Submission window is now ${isOpen ? "OPEN" : "CLOSED"}`,
      data,
    });
  } catch (err) {
    next(err);
  }
};