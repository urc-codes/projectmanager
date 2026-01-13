import jwt from "jsonwebtoken";
import { User } from "./auth.model";
import { AppError } from "../../libs/appError";
import { UserRole } from "./auth.types";
import { env } from "../../config/env";

const signToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const registerUser = async (data: {
  email: string;
  password: string; 
  role: UserRole;
  indexNumber?: string;
}) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new AppError("Email already in use", 400);

  if (data.indexNumber) {
    const existingIndex = await User.findOne({ indexNumber: data.indexNumber });
    if (existingIndex) throw new AppError("Index number already in use", 400);
  }

  const newUser = await User.create({
    email: data.email,
    passwordHash: data.password, 
    role: data.role,
    indexNumber: data.indexNumber,
  });

  const token = signToken(newUser._id.toString(), newUser.role);
  return { user: newUser, token };
};

export const loginWithIndex = async (indexNumber: string, password: string) => {
  const user = await User.findOne({ indexNumber, role: UserRole.STUDENT });

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid index number or password", 401);
  }

  const token = signToken(user._id.toString(), user.role);
  return { token };
};

export const loginWithEmail = async (
  email: string,
  password: string,
  role: UserRole
) => {
  const user = await User.findOne({ email, role });

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = signToken(user._id.toString(), user.role);
  return { token };
};
