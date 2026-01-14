import { z } from "zod";
import { Types } from "mongoose";

export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Team name must be at least 3 characters"),
  }),
});

export const inviteMemberSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email address to invite"),
  }),
});

export const removeMemberSchema = z.object({
  params: z.object({
    userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid User ID",
    }),
  }),
});
