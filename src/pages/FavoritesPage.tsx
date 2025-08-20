import { Title } from "@/components/ui/Title";
import { FavoriteList } from "@/features/favorites/components/FavoriteList";

export const FavoritesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <Title aria-label="favorites-title">Your favorite characters</Title>
      <FavoriteList />
    </div>
  );
};
