import { FileText } from "lucide-react";

const DocumentPreview = ({ muted }: { muted?: boolean }) => (
  <div
    className={`flex items-center justify-between border rounded-lg p-4 ${
      muted ? "bg-neutral-50 opacity-70" : "bg-white"
    }`}
  >
    <div className="flex items-center gap-3">
      <FileText className="text-neutral-500" size={20} />
      <div>
        <p className="text-sm font-medium text-neutral-800">
          Project_Proposal.pdf
        </p>
        <p className="text-xs text-neutral-500">PDF · 1.4 MB</p>
      </div>
    </div>

    <button className="text-sm text-neutral-600 hover:underline">
      Preview
    </button>
  </div>
);

export default DocumentPreview;;