import { useQueries } from "@tanstack/react-query";
import { getCharacterByUrl } from "../services/singleCharacterService";

export const useGetMultipleCharacters = (urls: Array<string>) => {
  return useQueries({
    queries: urls.map((url) => {
      return {
        queryKey: ["character-by-url", url],
        queryFn: () => getCharacterByUrl(url),
        staleTime: 1000 * 60 * 60,
      };
    }),
  });
};
