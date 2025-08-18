import { useQuery } from "@tanstack/react-query";
import { getFavoritesCharacters } from "../services/getFavoritesCharacters";
import { useFavoriteCharactersStore } from "../store";

export const useGetFavoriteCharacters = () => {
  const favorites = useFavoriteCharactersStore((state) => state.favorites);

  return useQuery({
    queryKey: ["favorite-characters", favorites],
    queryFn: () => getFavoritesCharacters(favorites),
    enabled: favorites.length > 0,
    staleTime: 1000 * 60 * 60,
  });
};
