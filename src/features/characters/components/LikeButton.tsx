import { Button } from "@/components/ui/button";
import { useFavoriteCharactersStore } from "@/features/favorites/store";
import clsx from "clsx";
import { FaHeart } from "react-icons/fa6";

type LikeButtonProps = {
  characterId: number;
  className?: string;
};
export const LikeButton = ({ characterId, className }: LikeButtonProps) => {
  const isFavorite = useFavoriteCharactersStore((state) =>
    state.isFavorite(characterId)
  );
  const toggleFavorite = useFavoriteCharactersStore(
    (state) => state.toggleFavorite
  );

  const handleClickLike = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    toggleFavorite(characterId);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClickLike}
      className={clsx(
        "h-10 w-10 p-0 cursor-pointer rounded-full focus:ring-0 active:scale-110 transition-all duration-200 hover:scale-110",
        className
      )}
    >
      <FaHeart
        className={clsx(`h-6 w-6 transition-colors`, {
          "text-red-500": isFavorite,
          "text-gray-500": !isFavorite,
        })}
      />
    </Button>
  );
};
