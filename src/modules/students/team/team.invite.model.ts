import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITeamInvite extends Document {
  email: string;
  teamId: Types.ObjectId;
  status: "PENDING" | "ACCEPTED";
  createdAt: Date;
}

const teamInviteSchema = new Schema<ITeamInvite>(
  {
    email: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    status: { type: String, enum: ["PENDING", "ACCEPTED"], default: "PENDING" },
  },
  { timestamps: true }
);

teamInviteSchema.index({ email: 1, teamId: 1 }, { unique: true });

export const TeamInvite = mongoose.model<ITeamInvite>(
  "TeamInvite",
  teamInviteSchema
);
