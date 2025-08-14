import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router";

export const CurrentFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const handleRemoveFilter = (key: string) => () => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  if (!searchParams.size) return null;

  return (
    <div className="flex flex-wrap gap-2 animate-fade-in">
      {Object.entries(params).map(([key, value]) => (
        <span
          key={key}
          className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-semibold px-2 py-1 rounded-full text-sm flex items-center"
        >
          {value}
          <Button
            variant="ghost"
            className="ml-2 text-red-400 hover:text-red-500 p-0 dark:hover:bg-transparent m-0 h-3"
            onClick={handleRemoveFilter(key)}
          >
            <IoClose size={16} />
          </Button>
        </span>
      ))}
    </div>
  );
};
