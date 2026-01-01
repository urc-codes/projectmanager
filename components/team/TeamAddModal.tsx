import React, { useState } from "react";

interface TeamAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: { name: string; index: string }) => void;
}

const TeamAddModal = ({ isOpen, onClose, onAdd }: TeamAddModalProps) => {
  const [name, setName] = useState("");
  const [index, setIndex] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && index) {
      onAdd({ name, index });
      setName("");
      setIndex("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 font-sans">
      <div className="bg-white w-95 rounded-lg p-6 relative">
        <button
          className="absolute top-3 right-4 text-neutral-600"
          onClick={onClose}
          aria-label="Close"
        >
          <span style={{ fontSize: "1.5rem" }}>&times;</span>
        </button>
        <div className="font-medium  mb-6 text-base">Add team member</div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm block mb-1">Full name</label>
            <input
              className="w-full px-3 py-2 rounded border border-neutral-300 focus:border-black bg-neutral-50 outline-none"
              placeholder="Enter student's full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="text-sm block mb-1">Index number</label>
            <input
              className="w-full px-3 py-2 rounded border border-neutral-300 focus:border-black bg-neutral-50 outline-none"
              placeholder="e.g., 10987432"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-neutral-900 text-white rounded px-4 py-2 font-medium hover:bg-neutral-800 transition-all"
            >
              Add member
            </button>
            <button
              type="button"
              className="text-neutral-500 hover:text-neutral-900 px-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamAddModal;
