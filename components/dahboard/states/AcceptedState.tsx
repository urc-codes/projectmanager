import DocumentPreview from "../previews/DocumentPreview";
import StateCard from "../StateCard";

const AcceptedState = () => (
  <StateCard
    title="Proposal accepted"
    description="Congratulations. Your project proposal has been approved."
  >
    <DocumentPreview />
    <p className="mt-4 text-sm text-neutral-600">
      You may now proceed with project execution.
    </p>
  </StateCard>
);

export default AcceptedState;