import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  favorites: number[];
};
type Action = {
  toggleFavorite: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
};

export const useFavoriteCharactersStore = create<State & Action>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (characterId) => {
        const { favorites } = get();

        if (!favorites.includes(characterId)) {
          set({ favorites: [...favorites, characterId] });
          return;
        }

        set({ favorites: favorites.filter((fav) => fav !== characterId) });
      },
      isFavorite: (characterId) => get().favorites.includes(characterId),
    }),
    {
      name: "favorite-characters-storage",
    }
  )
);
