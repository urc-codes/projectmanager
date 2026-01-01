"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TeamAddModal from "@/components/team/TeamAddModal";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useTeam } from "@/service/useTeamService";

const TeamsPage = () => {
  const teamId = "TEAM001";
  const { members, addMember, removeMember } = useTeam(teamId);
  const [showModal, setShowModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6 font-sans">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-medium text-neutral-900">
              Team Members
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Manage members assigned to your project team.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
          >
            <Plus size={16} />
            Add member
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-neutral-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-neutral-700">
                  Index Number
                </th>
                <th className="px-4 py-3 text-left font-medium text-neutral-700">
                  Role
                </th>
                <th className="px-4 py-3 text-right font-medium text-neutral-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {members.map((mem, idx) => (
                <tr
                  key={mem.index}
                  className="hover:bg-neutral-50/40 transition"
                >
                  <td className="px-4 py-3 text-neutral-900">{mem.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-neutral-700">
                    {mem.index}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium
                    ${
                      mem.role === "Lead"
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                    >
                      {mem.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {mem.role !== "Lead" && (
                      <button
                        onClick={() => removeMember(idx)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-neutral-600 max-w-xl">
          Teams are locked after proposal submission. Only one proposal is
          allowed per team.
        </p>
      </div>

      <TeamAddModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={addMember}
      />
    </DashboardLayout>
  );
};

export default TeamsPage;
