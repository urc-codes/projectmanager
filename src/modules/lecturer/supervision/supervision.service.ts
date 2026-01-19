import { Submission } from "../../students/submission/submission.model";
import { AppError } from "../../../libs/appError";

export const getPendingRequests = async (lecturerId: string) => {
  return await Submission.find({
    supervisor: lecturerId,
    status: "PENDING",
  })
    .populate("student", "email indexNumber fullName") 
    .sort({ createdAt: -1 });
};

export const respondToProposal = async (
  lecturerId: string,
  submissionId: string,
  status: "APPROVED" | "REJECTED",
  comment?: string,
) => {
  const submission = await Submission.findById(submissionId);

  if (!submission) {
    throw new AppError("Submission not found", 404);
  }

  if (submission.supervisor.toString() !== lecturerId.toString()) {
    throw new AppError("You are not the supervisor for this project.", 403);
  }

  submission.status = status;
  if (comment) {
    submission.supervisorComment = comment;
  }

  await submission.save();

  return submission;
};

export const getActiveProjects = async (lecturerId: string) => {
  return await Submission.find({
    supervisor: lecturerId,
    status: "APPROVED",
  }).populate("student", "email indexNumber fullName");
};
