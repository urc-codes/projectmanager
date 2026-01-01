"use client";
import React, { useRef, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProgressBar from "@/components/proposal/ProgressBar";
import { FileText, Trash2, Upload } from "lucide-react";
import { useProposal } from "@/service/useProposalService";

const SUPERVISORS = [
  { name: "Dr. Sophia Mensah", department: "Computer Science" },
  { name: "Dr. James Kwaku", department: "Information Technology" },
  { name: "Prof. Esi Owusu", department: "Software Engineering" },
];

const ProposalPage = () => {
  const teamId = "TEAM001";
  const {  error } =
    useProposal(teamId);
  const [currentSection, setCurrentSection] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected) {
      setFiles((prev) => [...prev, ...Array.from(selected)]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };


  return (
    <DashboardLayout>
      <main className="max-w-3xl px-4 py-10">
        <div>
          <header className="mb-8">
            <h1 className="text-xl font-medium text-neutral-900">
              Submit Proposal
            </h1>
            <p className="mt-1 text-sm text-neutral-500 max-w-md">
              Complete all sections to submit your project proposal.
            </p>
          </header>

          <ProgressBar
            currentSection={currentSection}
            sections={["Project Definition", "Technical & Submission"]}
          />

          <form className="mt-10 space-y-14">
            {/* STEP 1 */}
            {currentSection === 0 && (
              <section>
                <h2 className="mb-6 text-[11px] uppercase tracking-wider text-neutral-400">
                  Step 1 · Project Definition
                </h2>
                <div className="space-y-5">
                  <Field label="Project title">
                    <input
                      className="input"
                      placeholder="Enter project title"
                      // value={} onChange={} tie to state
                    />
                  </Field>
                  <Field label="Short description">
                    <textarea
                      rows={2}
                      className="input resize-none"
                      placeholder="Brief description of your project"
                    />
                  </Field>
                  <Field label="Objectives">
                    <textarea
                      rows={2}
                      className="input resize-none"
                      placeholder="What do you aim to achieve?"
                    />
                  </Field>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className=" bg-black p-3 rounded-xl text-white"
                    onClick={() => setCurrentSection(1)}
                  >
                    Continue
                  </button>
                </div>
              </section>
            )}

            {/* STEP 2 */}
            {currentSection === 1 && (
              <section>
                <h2 className="mb-6 text-[11px] uppercase tracking-wider text-neutral-400">
                  Step 2 · Technical & Submission
                </h2>
                <div className="space-y-5">
                  <Field label="Tools and technologies">
                    <input
                      className="input"
                      placeholder="e.g. React, Python, PostgreSQL"
                    />
                  </Field>
                  <Field label="Methodology notes (optional)">
                    <textarea
                      rows={2}
                      className="input resize-none"
                      placeholder="Any specific methodology or approach?"
                    />
                  </Field>
                  <Field label="Preferred supervisor">
                    <select className="input bg-white">
                      <option value="">Select a supervisor</option>
                      {SUPERVISORS.map((sup) => (
                        <option key={sup.name} value={sup.name}>
                          {sup.name} ({sup.department})
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Proposal documents">
                    <div className="flex flex-col gap-3">
                      {files.length > 0 &&
                        files.map((file, idx) => (
                          <div
                            key={file.name + idx}
                            className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-4"
                          >
                            <div className="flex items-center gap-3">
                              <FileText
                                size={18}
                                className="text-neutral-500"
                              />
                              <div className="text-sm">
                                <p className="font-medium text-neutral-800">
                                  {file.name}
                                </p>
                                <p className="text-xs text-neutral-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(idx)}
                              className="text-neutral-500 hover:text-red-600 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-4 text-sm text-neutral-600 hover:border-neutral-400 transition"
                      >
                        <Upload size={16} />
                        Add document
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,image/*"
                        hidden
                        onChange={handleFileChange}
                      />
                    </div>
                  </Field>
                </div>
                <div className="mt-10 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    You can add multiple files, remove or replace before
                    submission
                  </span>
                  <button
                    type="submit"
                    className=" bg-black p-3 rounded-xl text-white"
                  >
                    Submit proposal
                  </button>
                </div>
              </section>
            )}
          </form>
          {error && (
            <div className="mt-8 p-4 bg-red-100 text-red-600 border border-red-200 rounded">
              {error}
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};
const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-sm text-neutral-700">{label}</label>
    {children}
  </div>
);

export default ProposalPage;
