import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISubmission extends Document {
  student: Types.ObjectId;
  title: string;
  description: string;
  objectives: string;
  tools: string[];
  supervisor: Types.ObjectId;
  documentPath?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  supervisorComment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const submissionSchema = new Schema<ISubmission>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    objectives: { type: String, required: true },
    tools: [{ type: String, required: true }],
    supervisor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    documentPath: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    supervisorComment: { type: String },
  },
  { timestamps: true },
);

export const Submission = mongoose.model<ISubmission>(
  "Submission",
  submissionSchema,
);
