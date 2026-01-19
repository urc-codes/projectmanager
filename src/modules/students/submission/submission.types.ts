import { z } from "zod";
import { Types } from "mongoose";

export const createSubmissionSchema = z.object({
  body: z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    objectives: z.string().min(10, "Please list your objectives"),
    tools: z.string().min(2, "Please list the tools you will use"),
    supervisorId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Supervisor ID",
    }),
  }),
});
