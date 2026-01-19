import { User } from "../auth/auth.model";
import { UserRole } from "../auth/auth.types";
import { AppError } from "../../libs/appError";

export const getPendingLecturers = async () => {
  const pending = await User.find({
    role: UserRole.LECTURER,
    isApproved: false,
  }).select("-passwordHash");
  return pending;
};




export const getAllLecturers = async () => {
  const lecturers = await User.find({
    role: UserRole.LECTURER,
    isApproved: true,
  }).select("-passwordHash");
  return lecturers;
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
