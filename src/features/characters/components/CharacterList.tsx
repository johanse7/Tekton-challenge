import { ErrorHandler } from "@/components/ui/ErrorHandler";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useIntersectionObserver, useMediaQuery } from "@uidotdev/usehooks";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { useGetCharacters } from "../hooks/useGetCharacters";
import type { CharacterListParams } from "../interfaces/character";
import { COLUMNS_RESPONSIVE } from "../utils/constans";
import { CharacterCard } from "./CharacterCard";
import { CharacterListSkeleton } from "./SkeletonCharacter";

export const CharacterList = () => {
  const [searchParams] = useSearchParams();

  const parentRef = useRef<HTMLDivElement>(null);
  const [loadMoreRef, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const params = Object.fromEntries(searchParams) as CharacterListParams;

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    status,
  } = useGetCharacters(params);

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    estimateSize: () => 570,
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

          const isLoaderRow = virtualRow.index >= allCharacters.length;
          if (isLoaderRow) console.log(isLoaderRow);

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
                {isLoaderRow
                  ? "loading"
                  : rowItems.map((character) => (
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
