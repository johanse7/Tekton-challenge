import { ErrorHandler } from "@/components/ui/ErrorHandler";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useGetCharacters } from "../hooks/useGetCharacters";
import type { CharacterListParams } from "../interfaces/character";
import { CharacterCard } from "./CharacterCard";
import { CharacterListSkeleton } from "./SkeletonCharacter";

export const CharacterList = () => {
  const [searchParams] = useSearchParams();

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const params = Object.fromEntries(searchParams) as CharacterListParams;

  const {
    data,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  } = useGetCharacters(params);

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <CharacterListSkeleton />;

  if (isError) return <ErrorHandler error={error} />;

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 py-6 animate-fade-in">
        {data?.pages.flatMap((page) =>
          page.results.map((character) => (
            <li key={character.id}>
              <CharacterCard character={character} />
            </li>
          ))
        )}
      </ul>
      {hasNextPage && (
        <div ref={ref}>
          {isFetchingNextPage && <CharacterListSkeleton count={3} />}
        </div>
      )}
    </>
  );
};
