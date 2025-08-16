import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import { useGetMultipleCharacters } from "../hooks/useGetMultipleCharacters";

type ResidentsProps = {
  residents: Array<string>;
};

export const Residents = ({ residents = [] }: ResidentsProps) => {
  const results = useGetMultipleCharacters(residents);

  if (!residents?.length) {
    return (
      <div className="text-gray-600 dark:text-gray-400">
        No residents found in this location.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
        Residents in the same location
      </p>
      <ul className="flex flex-wrap gap-4">
        {results.map((result, index) => {
          if (result.isLoading) {
            return (
              <li key={`loading-${index}`} className="text-gray-500">
                <Skeleton className="w-11 h-11 rounded-full" />
              </li>
            );
          }

          const character = result.data;

          if (!character) return null;

          const { id, name, image } = character;
          return (
            <li key={`character-${id}`} className="flex items-center gap-2">
              <Link to={`/character/${id}`} title={name}>
                <img
                  src={image}
                  alt={`Portrait of ${name}`}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover border shadow-sm transition-transform duration-200 hover:scale-110 animate-fade-in"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
