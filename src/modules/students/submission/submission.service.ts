import { AppError } from "../../../libs/appError";
import { User } from "../../auth/auth.model";
import { UserRole } from "../../auth/auth.types";
import { Submission } from "./submission.model";
import * as systemService from "../../system/system.service";


export const getApprovedLecturers = async () => {
  return await User.find({
    role: UserRole.LECTURER,
    isApproved: true,
  }).select("email indexNumber fullName");
};

export const createSubmission = async (
  studentId: string,
  data: any,
  file?: Express.Multer.File | any,
) => {
  const isOpen = await systemService.isSubmissionOpen();
  if (!isOpen) {
    throw new AppError(
      "Project submissions are currently CLOSED by the Administrator.",
      403,
    );
  }

  const activeSubmission = await Submission.findOne({
    student: studentId,
    status: { $in: ["PENDING", "APPROVED"] },
  });

  if (activeSubmission) {
    throw new AppError(
      "You already have an active project proposal. You cannot submit another unless your current one is rejected.",
      400,
    );
  }

  const supervisor = await User.findById(data.supervisorId);
  if (!supervisor || supervisor.role !== UserRole.LECTURER) {
    throw new AppError("Invalid supervisor selected.", 400);
  }
  if (!supervisor.isApproved) {
    throw new AppError(
      "Selected supervisor is not yet approved by Admin.",
      400,
    );
  }

  const toolsArray = data.tools.split(",").map((t: string) => t.trim());

  const newSubmission = await Submission.create({
    student: studentId,
    title: data.title,
    description: data.description,
    objectives: data.objectives,
    tools: toolsArray,
    supervisor: data.supervisorId,
    documentPath: file ? file.path : undefined,
  });

  return newSubmission;
};

export const getMySubmissions = async (studentId: string) => {
  return await Submission.find({ student: studentId })
    .populate("supervisor", "email")
    .sort({ createdAt: -1 });
};
