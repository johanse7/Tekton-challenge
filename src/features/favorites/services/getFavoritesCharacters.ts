import api from "@/api/apiClient";
import type { CharacterDetail } from "@/features/characterDetail/interfaces/CharacterDetail";

export const getFavoritesCharacters = async (favorites: number[]) => {

  const { data } = await api.get<Array<CharacterDetail>>(
    `/character/${favorites.join(",")}`
  );

  return data;
};
