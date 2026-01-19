import { z } from "zod";
import { Types } from "mongoose";

export const approveLecturerSchema = z.object({
  params: z.object({
    lecturerId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Lecturer ID",
    }),
  }),
});
