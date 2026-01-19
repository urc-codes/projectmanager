import { Request, Response, NextFunction } from "express";
import * as teamService from "./team.service";

export const createTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;
    const team = await teamService.createTeam(userId, name);
    res.status(201).json({ status: "success", data: team });
  } catch (err) {
    next(err);
  }
};

export const getMyTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const team = await teamService.getMyTeam(userId);
    res.status(200).json({ status: "success", data: team });
  } catch (err) {
    next(err);
  }
};

export const inviteMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const { email } = req.body;
    const result = await teamService.inviteMember(userId, email);
    res.status(200).json({ status: "success", ...result });
  } catch (err) {
    next(err);
  }
};

export const getInvites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userEmail = req.user.email;
    const result = await teamService.getMyInvites(userEmail);
    res
      .status(200)
      .json({ status: "success", results: result.length, data: result });
  } catch (err) {
    next(err);
  }
};

export const respondToInvite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const userEmail = req.user.email;
    const { inviteId } = req.params;
    const { action } = req.body;

    const result = await teamService.respondToInvite(
      userId,
      userEmail,
      inviteId,
      action
    );
    res.status(200).json({ status: "success", ...result });
  } catch (err) {
    next(err);
  }
};

export const removeMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const { userId: memberIdToRemove } = req.params;
    const team = await teamService.removeMember(userId, memberIdToRemove);
    res.status(200).json({ status: "success", data: team });
  } catch (err) {
    next(err);
  }
};
