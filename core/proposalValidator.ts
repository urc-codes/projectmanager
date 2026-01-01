import {
  ProposalStatus,
  ProposalMetadata,
  ProposalFile,
} from "@/types/proposal";

export function validateProposalBeforeSubmit(
  metadata: ProposalMetadata,
  files: ProposalFile[],
  supervisor: string | undefined
): string | null {
  if (!metadata.title.trim()) return "Title is required";
  if (!metadata.description.trim()) return "Description is required";
  if (!metadata.objectives.trim()) return "Objectives are required";
  if (!metadata.tools.trim()) return "Tools are required";
  if (!supervisor) return "Supervisor selection is required";
  if (files.length === 0) return "At least one document upload is required";
  return null;
}

export function assertNoMultipleSubmission(current: ProposalStatus) {
  if (current !== "draft")
    throw new Error("Proposal already submitted or in progress");
}
