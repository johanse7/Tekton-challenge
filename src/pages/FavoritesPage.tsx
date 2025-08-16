import { Title } from "@/components/ui/Title";
import { FavoriteList } from "@/features/favorites/components/FavoriteList";

export const FavoritesPage = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <Title>Your favorite characters</Title>
      <FavoriteList />
    </div>
  );
};
