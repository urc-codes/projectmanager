export type ProposalStatus =
  | "draft"
  | "submitted"
  | "review"
  | "discussion"
  | "accepted";

export interface ProposalMetadata {
  title: string;
  description: string;
  objectives: string;
  tools: string;
  methodology?: string;
  supervisor: string;
  teamId: string; 
}

export interface Proposal {
  id: string;
  metadata: ProposalMetadata;
  files: ProposalFile[];
  supervisor: string; 
  timestamps: {
    draft: Date;
    submitted?: Date;
    review?: Date;
    discussion?: Date;
    accepted?: Date;
  };
  status: ProposalStatus;
  errorState?: string; 
}

export interface ProposalFile {
  id: string;
  name: string;
  size: number;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export type TeamMember = {
  name: string;
  index: string;
  role: "Lead" | "Member";
};
