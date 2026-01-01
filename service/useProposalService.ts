import { useState } from "react";
import { Proposal } from "@/types/proposal";
import { ProposalApi } from "@/api/ProposalApi";

export function useProposal(teamId: string) {
  const [proposal, setProposal] = useState<Proposal | null>(
    ProposalApi.getProposalByTeam(teamId)
  );
  const [error, setError] = useState<string | null>(null);

  async function createDraft(metadata?: any) {
    try {
      const p = ProposalApi.createDraft(teamId, metadata ?? {});
      setProposal(p);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function uploadFile(file: File, uploadedBy: string) {
    try {
      if (!proposal) throw new Error("No proposal in state");
      ProposalApi.uploadFile(proposal.id, file, uploadedBy);
      setProposal({ ...ProposalApi.getProposalByTeam(teamId) });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function removeFile(fileId: string) {
    try {
      if (!proposal) throw new Error("No proposal in state");
      ProposalApi.removeFile(proposal.id, fileId);
      setProposal({ ...ProposalApi.getProposalByTeam(teamId) });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function updateDraft(metadata: Partial<Proposal>) {
    try {
      if (!proposal) throw new Error("No proposal in state");
      ProposalApi.updateDraft(proposal.id, metadata);
      setProposal({ ...ProposalApi.getProposalByTeam(teamId) });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function submit() {
    try {
      if (!proposal) throw new Error("No proposal");
      ProposalApi.submitProposal(proposal.id);
      setProposal({ ...ProposalApi.getProposalByTeam(teamId) });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  // supervisor-facing
  async function review() {
    try {
      if (!proposal) throw new Error("No proposal");
      ProposalApi.beginReview(proposal.id);
      setProposal({ ...ProposalApi.getProposalByTeam(teamId) });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }
  async function discussion() {
    try {
      if (!proposal) throw new Error("No proposal");
      ProposalApi.requestDiscussion(proposal.id);
      setProposal({ ...ProposalApi.getProposalByTeam(teamId) });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }
  async function accept() {
    try {
      if (!proposal) throw new Error("No proposal");
      ProposalApi.acceptProposal(proposal.id);
      setProposal({ ...ProposalApi.getProposalByTeam(teamId) });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return {
    proposal,
    error,
    createDraft,
    uploadFile,
    removeFile,
    updateDraft,
    submit,
    review,
    discussion,
    accept,
  };
}
