import { Team } from "./team.model";
import { TeamInvite } from "./team.invite.model";
import { User } from "../auth/auth.model";
import { AppError } from "../../libs/appError";
import { sendEmail } from "../../libs/email";
import { Types } from "mongoose";

export const createTeam = async (leaderId: string, name: string) => {
  const existingTeam = await Team.findOne({ leader: leaderId });
  if (existingTeam) {
    throw new AppError("You have already created a team.", 400);
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

// Invite Member
export const inviteMember = async (leaderId: string, email: string) => {
  const team = await Team.findOne({ leader: leaderId });
  if (!team)
    throw new AppError("Only the team leader can invite members.", 403);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (team.members.includes(existingUser._id as Types.ObjectId)) {
      throw new AppError("User is already in your team.", 400);
    }
    const inOtherTeam = await Team.findOne({ members: existingUser._id });
    if (inOtherTeam)
      throw new AppError("User is already in another team.", 400);

    team.members.push(existingUser._id as Types.ObjectId);
    await team.save();
    await sendEmail(
      email,
      "Team Added",
      `You have been added to Team ${team.name}`
    );
    return { message: "User existed and was added to the team." };
  } else {
    const existingInvite = await TeamInvite.findOne({
      teamId: team._id,
      email,
    });
    if (existingInvite)
      throw new AppError("Invite already sent to this email.", 400);

    await TeamInvite.create({
      teamId: team._id,
      email,
    });

    await sendEmail(
      email,
      "Join my Team!",
      `You have been invited to join Team ${team.name}. Please Sign Up with this email to be automatically added.`
    );

    return { message: "Invite sent! User will be added upon signup." };
  }
};

// Remove Member
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

export const processInvitesOnSignup = async (userId: string, email: string) => {
  const invites = await TeamInvite.find({ email, status: "PENDING" });

  for (const invite of invites) {
    const team = await Team.findById(invite.teamId);
    if (team) {
      team.members.push(new Types.ObjectId(userId));
      await team.save();

      invite.status = "ACCEPTED";
      await invite.save();
    }
  }
};
