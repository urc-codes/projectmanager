import DocumentPreview from "../previews/DocumentPreview";
import StateCard from "../StateCard";

const SubmittedState = () => (
  <StateCard
    title="Proposal submitted"
    description="Your proposal has been successfully submitted and is awaiting review."
  >
    <DocumentPreview />
  </StateCard>
);


export default SubmittedState;
