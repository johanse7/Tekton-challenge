import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToggle } from "@/hooks";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { GoSearch } from "react-icons/go";
import { TbFilterPlus } from "react-icons/tb";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";
import { TYPING_DELAY } from "../utils/constans";
import { FilterPanel } from "./FilterPanel";

export const Search = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [searchTerm, setSearchTerm] = useSearchParams();
  const [openFilter, setOpenFilter] = useToggle();

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value.trim();
      if (!name) {
        searchTerm.delete("name");
      } else {
        searchTerm.set("name", name);
      }

      setSearchTerm(searchTerm);
    },
    TYPING_DELAY
  );

  return (
    <div
      className={cn(
        "relative w-full md:w-96 flex flex-1 flex-shrink-0",
        className
      )}
      {...props}
    >
      <Label htmlFor="search" className="sr-only">
        Email
      </Label>
      <Input
        id="search"
        name="search"
        placeholder="Search or filter characters"
        className="block w-full  h-10 rounded-lg  py-[9px] pl-10 text-sm outline-2 bg-gray-100"
        onChange={handleSearch}
        defaultValue={searchTerm.get("name") ?? ""}
      />
      <GoSearch
        aria-hidden="true"
        className="absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-900"
      />
      <Button
        className="absolute right-2 top-0.5 cursor-pointer hover:dark:bg-transparent"
        variant="ghost"
        size="icon"
        onClick={setOpenFilter}
      >
        <TbFilterPlus size={20} />
      </Button>
      {openFilter && <FilterPanel onClickClose={setOpenFilter} />}
    </div>
  );
};
