import { z } from "zod";
import { Types } from "mongoose";

export const updateProposalStatusSchema = z.object({
  params: z.object({
    submissionId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Submission ID",
    }),
  }),
  body: z.object({
    status: z.enum(["APPROVED", "REJECTED"], {
      errorMap: () => ({
        message: "Status must be either APPROVED or REJECTED",
      }),
    }),
    comment: z.string().optional(), 
  }),
});
