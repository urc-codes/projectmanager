import { Request, Response, NextFunction } from "express";
import * as supervisionService from "./supervision.service";

export const getPendingRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lecturerId = req.user._id;
    const requests = await supervisionService.getPendingRequests(lecturerId);
    res
      .status(200)
      .json({ status: "success", results: requests.length, data: requests });
  } catch (err) {
    next(err);
  }
};

export const respondToProposal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lecturerId = req.user._id;
    const { submissionId } = req.params;
    const { status, comment } = req.body;

    const result = await supervisionService.respondToProposal(
      lecturerId,
      submissionId,
      status,
      comment,
    );

    res.status(200).json({
      status: "success",
      message: `Project ${status.toLowerCase()} successfully`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getActiveProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lecturerId = req.user._id;
    const projects = await supervisionService.getActiveProjects(lecturerId);
    res
      .status(200)
      .json({ status: "success", results: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
};
