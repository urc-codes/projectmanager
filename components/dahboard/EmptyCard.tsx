import Image from "next/image";

const EmptyCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => (
  <div className="p-6 border border-dashed border-neutral-200 rounded-lg h-96  w-full flex flex-col items-center justify-center text-center bg-neutral-50/10">
    <div className="w-24 h-24 mb-4 flex items-center justify-center">
      <Image src={image} alt="" width={96} height={96} />
    </div>
    <h1 className="text-black text-2xl font-light">{title}</h1>
    <p className="text-neutral-600 mt-2 text-sm">{description}</p>
  </div>
);

export default EmptyCard;