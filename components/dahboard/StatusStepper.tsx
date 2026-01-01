import React from "react";
import { ProposalStatus } from "@/types/proposal";

const steps: { label: string; key: ProposalStatus }[] = [
  { label: "Draft", key: "draft" },
  { label: "Submitted", key: "submitted" },
  { label: "Under Review", key: "review" },
  { label: "Discussion", key: "discussion" },
  { label: "Accepted", key: "accepted" },
];

interface StatusStepperProps {
  activeStep?: number;
}

const StatusStepper: React.FC<StatusStepperProps> = ({ activeStep = 0 }) => (
  <div>
    <div className="mb-2 text-xs font-medium text-neutral-600">STATUS</div>
    <div className="relative">
      <div className="absolute top-3 left-0 right-0 h-px bg-neutral-200" />
      <div className="flex justify-between">
        {steps.map((step, idx) => (
          <div key={step.key} className="flex flex-col items-center">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full border-2 bg-white
              ${idx <= activeStep ? "border-green-500" : "border-neutral-200"}`}
            >
              <div
                className={`w-3 h-3 rounded-full
                ${idx <= activeStep ? "bg-green-500" : "bg-neutral-200"}`}
              />
            </div>
            <span
              className={`mt-2 text-xs
                ${
                  idx === activeStep
                    ? "text-black font-semibold"
                    : "text-neutral-500"
                }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StatusStepper;
