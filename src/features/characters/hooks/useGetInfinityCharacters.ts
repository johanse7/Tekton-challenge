import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";
import type { CharacterListParams } from "../interfaces/character";
import { getCharacters } from "../services/characterService";

export const useGetInfinityCharacters = (params: CharacterListParams) => {
  const { hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useInfiniteQuery({
      queryKey: ["characters", params],
      queryFn: ({ pageParam = 1 }) =>
        getCharacters({ ...params, page: pageParam }),
      getNextPageParam: (lastPage) => {
        if (lastPage.info.next) {
          const url = new URL(lastPage.info.next);
          const nextPage = url.searchParams.get("page");
          return nextPage ? parseInt(nextPage, 10) : undefined;
        }
        return undefined;
      },
      initialPageParam: 1,
      retry: 1,
    });

  const [loadMoreRef, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  };
};
