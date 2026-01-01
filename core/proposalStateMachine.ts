import { ProposalStatus } from "@/types/proposal";

const validTransitions: Record<ProposalStatus, ProposalStatus[]> = {
  draft: ["submitted"],
  submitted: ["review"],
  review: ["discussion", "accepted"],
  discussion: ["review", "accepted"],
  accepted: [], 
};

export class ProposalStateMachine {
  private current: ProposalStatus;
  constructor(init: ProposalStatus) {
    this.current = init;
  }
  canTransition(to: ProposalStatus) {
    return validTransitions[this.current].includes(to);
  }
  transition(to: ProposalStatus) {
    if (!this.canTransition(to)) {
      throw new Error(`Invalid state transition: ${this.current} → ${to}`);
    }
    this.current = to;
    return this.current;
  }
  getCurrent() {
    return this.current;
  }
}
