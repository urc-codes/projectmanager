import { z } from "zod";
import { Types } from "mongoose";

export const approveLecturerSchema = z.object({
  params: z.object({
    lecturerId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Lecturer ID",
    }),
  }),
});



export const toggleWindowSchema = z.object({
  body: z.object({
    isOpen: z.boolean({ required_error: "isOpen is required (true/false)" }),
  }),
});

export const reassignSupervisorSchema = z.object({
  params: z.object({
    submissionId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Submission ID",
    }),
  }),
  body: z.object({
    newSupervisorId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Supervisor ID",
    }),
  }),
});