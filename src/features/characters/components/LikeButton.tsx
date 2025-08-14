import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";
import { FaHeart } from "react-icons/fa6";

export const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleClickLike = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClickLike}
      className="h-10 w-10 p-0 cursor-pointer rounded-full hover:bg-transparent focus:ring-0 active:scale-110 transition-all duration-150"
    >
      <FaHeart
        className={clsx(`h-6 w-6 transition-colors`, {
          "text-red-500": liked,
          "text-gray-400": !liked,
        })}
      />
    </Button>
  );
};
