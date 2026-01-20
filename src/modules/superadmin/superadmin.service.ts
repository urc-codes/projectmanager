import { User } from "../auth/auth.model";
import { UserRole } from "../auth/auth.types";
import { AppError } from "../../libs/appError";
import { Submission } from "../students/submission/submission.model";
import * as systemService from "../system/system.service"; 




export const getPendingLecturers = async () => {
  const pending = await User.find({
    role: UserRole.LECTURER,
    isApproved: false,
  }).select("-passwordHash");
  return pending;
};

export const getStudentsWithApprovedProjects = async () => {
  const submissions = await Submission.find({ status: "APPROVED" })
    .populate("student", "email indexNumber role")
    .populate("supervisor", "email");
  return submissions;
};

export const getRejectedSubmissions = async () => {
  const submissions = await Submission.find({ status: "REJECTED" })
    .populate("student", "email indexNumber")
    .populate("supervisor", "email")
    .sort({ updatedAt: -1 });
  return submissions;
};

export const getAllLecturers = async () => {
  const lecturers = await User.find({
    role: UserRole.LECTURER,
    isApproved: true,
  }).select("-passwordHash");
  return lecturers;
};

export const getAllStudents = async () => {
  const students = await User.find({
    role: UserRole.STUDENT,
  }).select("-passwordHash");
  return students;
};

export const approveLecturer = async (lecturerId: string) => {
  const lecturer = await User.findById(lecturerId);

  if (!lecturer) {
    throw new AppError("User not found", 404);
  }

  if (lecturer.role !== UserRole.LECTURER) {
    throw new AppError("User is not a lecturer", 400);
  }

  if (lecturer.isApproved) {
    throw new AppError("Lecturer is already approved", 400);
  }

  lecturer.isApproved = true;
  await lecturer.save();

  return lecturer;
};

export const rejectLecturer = async (lecturerId: string) => {
  const lecturer = await User.findOneAndDelete({
    _id: lecturerId,
    role: UserRole.LECTURER,
  });

  if (!lecturer) throw new AppError("Lecturer not found", 404);
  return { message: "Lecturer request rejected and removed." };
};





export const reassignSupervisor = async (
  submissionId: string,
  newSupervisorId: string,
) => {
  const submission = await Submission.findById(submissionId);
  if (!submission) throw new AppError("Submission not found", 404);

  const newSupervisor = await User.findById(newSupervisorId);
  if (!newSupervisor || newSupervisor.role !== UserRole.LECTURER) {
    throw new AppError("New supervisor not found or is not a lecturer", 400);
  }
  if (!newSupervisor.isApproved) {
    throw new AppError("New supervisor is not approved yet", 400);
  }

  submission.supervisor = newSupervisor._id as any;
  await submission.save();

  return submission;
};






export const getWindowStatus = async () => {
  return await systemService.getSubmissionWindowStatus();
};

export const setWindowStatus = async (isOpen: boolean) => {
  return await systemService.toggleSubmissionWindow(isOpen);
};