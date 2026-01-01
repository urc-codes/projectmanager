import { useState } from "react";
import { TeamMember } from "@/types/proposal";

const initialMembers: TeamMember[] = [
  { name: "Kwesi Amponsah", index: "UEB1104722", role: "Lead" },
];

export function useTeam(teamId: string) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  function addMember(member: { name: string; index: string }) {
    setMembers((current) => [...current, { ...member, role: "Member" }]);
  }
  function removeMember(idx: number) {
    setMembers((members) => members.filter((_, i) => i !== idx));
  }
  return {
    members,
    addMember,
    removeMember,
  };
}
