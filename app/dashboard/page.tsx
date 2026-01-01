"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ProposalStatus } from "@/types/proposal";
import DraftState from "@/components/dahboard/states/DraftState";
import SubmittedState from "@/components/dahboard/states/SubmittedState";
import ReviewState from "@/components/dahboard/states/ReviewState";
import AcceptedState from "@/components/dahboard/states/AcceptedState";
import DiscussionState from "@/components/dahboard/states/DiscussionState";
import StatusStepper from "@/components/dahboard/StatusStepper";

const steps: ProposalStatus[] = [
  "draft",
  "submitted",
  "review",
  "discussion",
  "accepted",
];

const getStepIndex = (status: ProposalStatus) => steps.indexOf(status);

const DashboardPage = () => {
  const [status] = useState<ProposalStatus>("accepted");

  return (
    <DashboardLayout>
      <div className="pb-20 font-sans">
        <StatusStepper activeStep={getStepIndex(status)} />
      </div>

      <div className="max-w-3xl">
        {status === "draft" && <DraftState />}
        {status === "submitted" && <SubmittedState />}
        {status === "review" && <ReviewState />}
        {status === "discussion" && <DiscussionState />}
        {status === "accepted" && <AcceptedState />}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
