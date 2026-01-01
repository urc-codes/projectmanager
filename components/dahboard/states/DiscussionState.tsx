import DocumentPreview from "../previews/DocumentPreview";
import StateCard from "../StateCard";

const DiscussionState = () => (
  <StateCard
    title="Discussion required"
    description="Your supervisor has requested clarification or discussion."
  >
    <DocumentPreview />
    <p className="mt-4 text-sm text-neutral-600">
      Check your notifications for feedback.
    </p>
  </StateCard>
);

export default DiscussionState;