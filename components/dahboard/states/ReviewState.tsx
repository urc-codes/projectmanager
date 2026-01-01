import DocumentPreview from "../previews/DocumentPreview";
import StateCard from "../StateCard";

const ReviewState = () => (
  <StateCard
    title="Project Proposal Under review"
    description="Your proposal is currently being reviewed by supervisors."
  >
    <DocumentPreview muted />
  </StateCard>
);
export default ReviewState;