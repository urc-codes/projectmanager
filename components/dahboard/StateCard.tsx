const StateCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) => (
  <div className="">
    <h1 className="text-xl font-medium text-neutral-900">{title}</h1>
    <p className="text-sm text-neutral-600 mt-1">{description}</p>

    <div className="mt-6">{children}</div>
  </div>
);

export default StateCard;