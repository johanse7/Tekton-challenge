import { SlLocationPin } from "react-icons/sl";

import { useGetLocation } from "../hooks/useGetLocation";
import { LocationSkeleton } from "./Skeletons";
import { Residents } from "./Residents";

type LocationProps = {
  locationUrl?: string;
};
export const Location = ({ locationUrl }: LocationProps) => {
  const { data: location, isLoading } = useGetLocation(locationUrl);

  if (isLoading) return <LocationSkeleton />;

  if (!location)
    return (
      <p className="text-gray-600 text-sm dark:text-gray-400">
        <span className="font-semibold">Unknown location</span>
      </p>
    );

  const { name, type, dimension, residents } = location;

  return (
    <article className="flex flex-col gap-2 mt-3">
      <div className="flex items-center gap-2">
        <SlLocationPin size={20} />
        <p className="text-lg font-bold text-gray-700 dark:text-gray-300 ">
          {name}
        </p>
      </div>
      <p className="text-gray-600 text-sm dark:text-gray-400">
        <span className="font-semibold">type:</span> {type}
      </p>
      <p className="text-gray-600 text-sm dark:text-gray-400">
        <span className="font-semibold">Dimension:</span> {dimension}
      </p>
      <div className="mt-10">
        <Residents residents={residents} />
      </div>
    </article>
  );
};
