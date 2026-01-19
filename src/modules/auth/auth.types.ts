import { z } from "zod";

export enum UserRole {
  STUDENT = "STUDENT",
  LECTURER = "LECTURER",
  SUPER_ADMIN = "SUPER_ADMIN",
}


// Student Schemas
export const studentSignupSchema = z.object({
  body: z.object({
    email: z.string().email(),
    indexNumber: z.string().min(5),
    password: z.string().min(6),
  }),
});

export const studentSigninSchema = z.object({
  body: z.object({
    indexNumber: z.string().min(5),
    password: z.string().min(1),
  }),
});

// Lecturer Schemas
export const lecturerSignupSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const lecturerSigninSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

// Admin Schemas
export const adminSigninSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});
