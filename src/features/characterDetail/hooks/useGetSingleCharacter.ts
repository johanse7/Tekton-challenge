import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "../services/singleCharacterService";

export const useGetSingleCharacter = (id: string) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
