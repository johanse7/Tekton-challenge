import { Button } from "@/components/ui/button";
import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { RemoveScroll } from "react-remove-scroll";
import { useSearchParams } from "react-router";
import type { CharacterListParams } from "../interfaces/character";
import { FILTERS, INITIAL_STATE_FILTERS } from "../utils/constans";

type FilterProps = {
  onClickClose: () => void;
};

export const FilterPanel = ({ onClickClose }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<CharacterListParams | object>(() =>
    searchParams?.size
      ? (Object.fromEntries(searchParams) as CharacterListParams)
      : INITIAL_STATE_FILTERS
  );

  const refElement = useClickAway<HTMLDivElement>(() => {
    onClickClose();
  });

  const handleChangeFilter = (filterName: string, value: string) => () => {
    setFilters((filter) => {
      const currentValue = filter?.[filterName as keyof typeof filter];
      if (currentValue === value) {
        const { [filterName as keyof typeof filter]: _, ...rest } = filter;
        return {
          ...rest,
        };
      }
      return {
        ...filter,
        [filterName]: value,
      };
    });
  };

  const handleClickFilter = () => {
    for (const filterName in FILTERS) {
      const value = filters[filterName as keyof typeof filters];
      if (value) searchParams.set(filterName, value);
      else searchParams.delete(filterName);
    }

    setSearchParams(searchParams);
    onClickClose();
  };

  return (
    <RemoveScroll className="md:overflow-y-auto">
      <div
        ref={refElement}
        className="animate-fade-in flex flex-col gap-2 md:border md:top-16 md:border-gray-100 dark:border-gray-500 md:rounded-lg fixed left-0 top-0  md:shadow-xl w-full h-dvh z-50 bg-background p-6 md:absolute md:h-auto"
      >
        <header className="flex md:hidden">
          <div className="flex-grow-[0.5]">
            <button className="w-[28px]" onClick={onClickClose}>
              <FaArrowLeft size={20} />
            </button>
          </div>
          <h4 className="font-semibold">Filters</h4>
        </header>

        <div className="flex flex-col flex-grow">
          {Object.entries(FILTERS).map(([filterName, values]) => {
            return (
              <div className="mb-7" key={filterName}>
                <span className="font-medium text-gray-600 dark:text-gray-200 text-base capitalize">
                  {filterName}
                </span>
                <div className="flex gap-2 mt-5 flex-wrap">
                  {values.map(({ label, value }) => (
                    <Button
                      key={label}
                      variant="ghost"
                      className={clsx(
                        "py-[12px] px-[10px] rounded-lg border dark:text-gray-300 border-gray-500 min-w-24 md:min-w-20 hover:bg-primary-100 hover:bg-gray-300 hover:dark:bg-gray-700 ",
                        {
                          "bg-gray-300 dark:bg-gray-700 border-transparent":
                            filters?.[filterName as keyof typeof filters] ===
                            value,
                        }
                      )}
                      onClick={handleChangeFilter(filterName, value)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <Button onClick={handleClickFilter}>Filter</Button>
      </div>
    </RemoveScroll>
  );
};
