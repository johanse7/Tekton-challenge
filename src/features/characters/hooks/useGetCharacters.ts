import { useInfiniteQuery } from "@tanstack/react-query";
import type { CharacterListParams } from "../interfaces/character";
import { getCharacters } from "../services/characterService";

export const useGetCharacters = (params: CharacterListParams) => {
  return useInfiniteQuery({
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
};
