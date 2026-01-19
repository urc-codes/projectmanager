import { Request, Response, NextFunction } from "express";
import * as submissionService from "./submission.service";

export const getLecturersForDropdown = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lecturers = await submissionService.getApprovedLecturers();
    res.status(200).json({ status: "success", data: lecturers });
  } catch (err) {
    next(err);
  }
};

export const createSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.user._id;
    const result = await submissionService.createSubmission(
      studentId,
      req.body,
      req.file,
    );
    res.status(201).json({ status: "success", data: result });
  } catch (err) {
    next(err);
  }
};

export const getMySubmissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.user._id;
    const submissions = await submissionService.getMySubmissions(studentId);
    res
      .status(200)
      .json({
        status: "success",
        results: submissions.length,
        data: submissions,
      });
  } catch (err) {
    next(err);
  }
};
