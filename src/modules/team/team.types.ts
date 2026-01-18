import { z } from 'zod';
import { Types } from 'mongoose';

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

export const respondInviteSchema = z.object({
  params: z.object({
    inviteId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Invite ID",
    }),
  }),
  body: z.object({
    action: z.enum(['ACCEPT', 'DECLINE'], {
      errorMap: () => ({ message: "Action must be either ACCEPT or DECLINE" }),
    }),
  }),
});

export const removeMemberSchema = z.object({
  params: z.object({
    userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid User ID",
    }),
  }),
});