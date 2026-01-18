import { Team } from "./team.model";
import { TeamInvite } from "./team.invite.model";
import { User } from "../auth/auth.model";
import { AppError } from "../../libs/appError";
import { Types } from "mongoose";

export const createTeam = async (leaderId: string, name: string) => {
  const existingTeam = await Team.findOne({
    $or: [{ leader: leaderId }, { members: leaderId }],
  });

  if (existingTeam) {
    throw new AppError(
      "You are already part of a team. Leave it to create a new one.",
      400
    );
  }

  return await Team.create({
    leader: leaderId,
    name,
    members: [leaderId], 
  });
};

export const getMyTeam = async (userId: string) => {
  const team = await Team.findOne({
    $or: [{ leader: userId }, { members: userId }],
  }).populate("members", "email indexNumber role");

  if (!team) {
    throw new AppError("You are not part of any team.", 404);
  }
  return team;
};











export const inviteMember = async (leaderId: string, email: string) => {
  const team = await Team.findOne({ leader: leaderId });
  if (!team)
    throw new AppError("Only the team leader can invite members.", 403);

  const existingUser = await User.findOne({ email });
  if (
    existingUser &&
    team.members.includes(existingUser._id as Types.ObjectId)
  ) {
    throw new AppError("User is already in your team.", 400);
  }


  
  const existingInvite = await TeamInvite.findOne({ teamId: team._id, email });
  if (existingInvite)
    throw new AppError("Invite already sent to this email.", 400);

  await TeamInvite.create({
    teamId: team._id,
    email,
    status: "PENDING",
  });

  return { message: "Invitation created. Status: PENDING" };
};









export const getMyInvites = async (email: string) => {
  const invites = await TeamInvite.find({ email, status: "PENDING" }).populate(
    "teamId",
    "name leader"
  ); 
  return invites;
};














export const respondToInvite = async (
  userId: string,
  userEmail: string,
  inviteId: string,
  action: "ACCEPT" | "DECLINE"
) => {
  const invite = await TeamInvite.findById(inviteId);
  if (!invite)
    throw new AppError("Invite not found or already processed.", 404);

  if (invite.email !== userEmail) {
    throw new AppError("This invite does not belong to you.", 403);
  }

  if (action === "DECLINE") {
    await TeamInvite.findByIdAndDelete(inviteId);
    return { message: "Invitation declined." };
  }

  const existingTeam = await Team.findOne({
    $or: [{ leader: userId }, { members: userId }],
  });
  if (existingTeam) {
    throw new AppError(
      `You are already in team "${existingTeam.name}". You must leave it before accepting a new invite.`,
      400
    );
  }

  const team = await Team.findById(invite.teamId);
  if (!team) {
    await TeamInvite.findByIdAndDelete(inviteId); // Cleanup dead invite
    throw new AppError("The team no longer exists.", 404);
  }

  team.members.push(new Types.ObjectId(userId));
  await team.save();

  await TeamInvite.findByIdAndDelete(inviteId);

  return { message: `You have successfully joined Team ${team.name}` };
};













export const removeMember = async (
  leaderId: string,
  userIdToRemove: string
) => {
  const team = await Team.findOne({ leader: leaderId });
  if (!team) throw new AppError("Team not found", 404);

  if (leaderId === userIdToRemove) {
    throw new AppError(
      "Leader cannot remove themselves. Delete the team instead.",
      400
    );
  }

  team.members = team.members.filter((id) => id.toString() !== userIdToRemove);
  await team.save();

  return team;
};
