import React from "react";

interface ProgressBarProps {
  currentSection: number;
  sections: string[];
}

const ProgressBar = ({ currentSection, sections }: ProgressBarProps) => (
  <div className="mb-8">
    <div className="flex items-center gap-4">
      {sections.map((label, idx) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center
              ${
                currentSection >= idx
                  ? "bg-black text-white"
                  : "bg-neutral-200 text-neutral-500"
              }`}
          >
            {idx + 1}
          </div>
          <span
            className={`text-sm ${
              currentSection === idx
                ? "text-neutral-900 font-medium"
                : "text-neutral-500"
            }`}
          >
            {label}
          </span>
          {idx < sections.length - 1 && (
            <div className="w-10 h-px bg-neutral-300 ml-2" />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ProgressBar;
