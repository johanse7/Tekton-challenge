import { ErrorHandler } from "@/components/ui/ErrorHandler";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useMediaQuery } from "@uidotdev/usehooks";
import clsx from "clsx";
import { useRef } from "react";
import { useSearchParams } from "react-router";
import { useGetInfinityCharacters } from "../hooks/useGetInfinityCharacters";
import type { CharacterListParams } from "../interfaces/character";
import { COLUMNS_RESPONSIVE } from "../utils/constans";
import { CharacterCard } from "./CharacterCard";
import { CharacterListSkeleton } from "./SkeletonCharacter";

export const CharacterList = () => {
  const [searchParams] = useSearchParams();

  const parentRef = useRef<HTMLDivElement>(null);

  const params = Object.fromEntries(searchParams) as CharacterListParams;

  const {
    loadMoreRef,
    data,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    status,
  } = useGetInfinityCharacters(params);

  const allCharacters = data?.pages.flatMap(({ results }) => results) ?? [];

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px)");

  const columns = isDesktop
    ? COLUMNS_RESPONSIVE.DESKTOP
    : isTablet
    ? COLUMNS_RESPONSIVE.TABLET
    : COLUMNS_RESPONSIVE.MOBILE;

  const rows = Math.ceil(allCharacters.length / columns);

  const rowVirtualizer = useWindowVirtualizer({
    count: rows,
    estimateSize: () => 600,
    overscan: 5,
    scrollMargin: parentRef.current?.offsetTop,
  });

  if (isError) return <ErrorHandler error={error} />;
  if (status === "pending") return <CharacterListSkeleton />;

  return (
    <section ref={parentRef} className="py-6">
      <ul
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns;

          const rowItems = allCharacters.slice(
            startIndex,
            startIndex + columns
          );

          return (
            <li
              key={virtualRow.key}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${
                  virtualRow.start - rowVirtualizer.options.scrollMargin
                }px)`,
              }}
            >
              <div
                className={clsx(`grid gap-x-6 gap-y-10 `, {
                  "grid-cols-1": columns === COLUMNS_RESPONSIVE.MOBILE,
                  "grid-cols-2": columns === COLUMNS_RESPONSIVE.TABLET,
                  "grid-cols-3": columns === COLUMNS_RESPONSIVE.DESKTOP,
                })}
              >
                {rowItems.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      {hasNextPage && (
        <div ref={loadMoreRef} className="py-4 text-center">
          {isFetchingNextPage && <CharacterListSkeleton count={3} />}
        </div>
      )}
    </section>
  );
};
