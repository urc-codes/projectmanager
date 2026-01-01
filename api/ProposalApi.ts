import { Proposal, ProposalStatus, ProposalFile, ProposalMetadata } from "@/types/proposal";
import { ProposalStateMachine } from "@/core/proposalStateMachine";
import { validateProposalBeforeSubmit, assertNoMultipleSubmission } from "@/core/proposalValidator";

let proposalStore: Record<string, Proposal> = {};

export class ProposalApi {
  static getProposalByTeam(teamId: string): Proposal | null {
    return Object.values(proposalStore).find(p => p.metadata.teamId === teamId) ?? null;
  }

  static createDraft(teamId: string, metadata: Partial<ProposalMetadata>): Proposal {
    // One proposal per team
    const existing = this.getProposalByTeam(teamId);
    if (existing) throw new Error("Team already has a proposal");

    const now = new Date();
    const draft: Proposal = {
      id: crypto.randomUUID(),
      metadata: {
        ...metadata,
        title: "",
        description: "",
        objectives: "",
        tools: "",
        supervisor: "",
        teamId,
      } as ProposalMetadata,
      files: [],
      supervisor: "",
      timestamps: { draft: now },
      status: "draft",
    };
    proposalStore[draft.id] = draft;
    return draft;
  }

  static uploadFile(proposalId: string, file: File, uploadedBy: string): ProposalFile {
    const proposal = proposalStore[proposalId];
    if (!proposal) throw new Error("Proposal not found");
    if (proposal.status !== "draft") throw new Error("Cannot upload new files after submission");
    const proposalFile: ProposalFile = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      url: `/uploads/${file.name}`,
      uploadedAt: new Date(),
      uploadedBy,
    };
    proposal.files.push(proposalFile);
    return proposalFile;
  }

  static removeFile(proposalId: string, fileId: string) {
    const p = proposalStore[proposalId];
    if (!p) throw new Error("Proposal not found");
    if (p.status !== "draft") throw new Error("Cannot remove files after submission");
    p.files = p.files.filter(f => f.id !== fileId);
  }

  static updateDraft(proposalId: string, metadata: Partial<ProposalMetadata>) {
    const p = proposalStore[proposalId];
    if (!p) throw new Error("Proposal not found");
    if (p.status !== "draft") throw new Error("Only editable in draft");
    p.metadata = { ...p.metadata, ...metadata };
  }

  static submitProposal(proposalId: string) {
    const p = proposalStore[proposalId];
    if (!p) throw new Error("Proposal not found");
    assertNoMultipleSubmission(p.status);
    const err = validateProposalBeforeSubmit(p.metadata, p.files, p.metadata.supervisor);
    if (err) throw new Error(err);
    const sm = new ProposalStateMachine(p.status);
    p.status = sm.transition("submitted");
    p.timestamps.submitted = new Date();
    return p;
  }

  static beginReview(proposalId: string) {
    const p = proposalStore[proposalId];
    if (!p) throw new Error("Proposal not found");
    if (p.status !== "submitted") throw new Error("Can only review submitted proposal");
    const sm = new ProposalStateMachine(p.status);
    p.status = sm.transition("review");
    p.timestamps.review = new Date();
  }

  static requestDiscussion(proposalId: string) {
    const p = proposalStore[proposalId];
    if (!p || p.status !== "review") throw new Error("Can only go to discussion from review");
    const sm = new ProposalStateMachine(p.status);
    p.status = sm.transition("discussion");
    p.timestamps.discussion = new Date();
  }

  static backToReviewFromDiscussion(proposalId: string) {
    const p = proposalStore[proposalId];
    if (!p || p.status !== "discussion") throw new Error("Can only move to review from discussion");
    const sm = new ProposalStateMachine(p.status);
    p.status = sm.transition("review");
    p.timestamps.review = new Date();
  }

  static acceptProposal(proposalId: string) {
    const p = proposalStore[proposalId];
    if (!p || !["review", "discussion"].includes(p.status)) throw new Error("Can only accept from review/discussion");
    const sm = new ProposalStateMachine(p.status);
    p.status = sm.transition("accepted");
    p.timestamps.accepted = new Date();
  }
}