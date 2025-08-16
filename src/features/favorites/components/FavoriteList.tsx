import clsx from "clsx";
import { Link } from "react-router";
import { useGetFavoriteCharacters } from "../hooks/useGetFavoriteCharacters";
import { FavoriteListSkeleton } from "./FavoriteListSkeleton";

export const FavoriteList = () => {
  const { data: favorites, isLoading } = useGetFavoriteCharacters();

  if (isLoading) return <FavoriteListSkeleton />;

  if (!favorites?.length) {
    return (
      <p className="text-center text-2xl  text-gray-800 dark:text-gray-200 mt-20">
        There no favorites
      </p>
    );
  }

  return (
    <section className="columns-2 md:columns-3 lg:columns-4 gap-5  py-10 md:py-20 animate-fade-in">
      {favorites?.map(({ id, image, name }, index) => (
        <Link
          key={id}
          to={`/character/${id}`}
          className="block mb-5 break-inside-avoid rounded-lg overflow-hidden shadow-md"
          title={name}
        >
          <img
            src={image}
            alt={`Portrait of ${name}`}
            loading="lazy"
            className={clsx(
              `w-full object-cover transition-transform duration-200 hover:scale-105`,
              index % 2 ? "h-40 md:h-40" : "h-60 md:h-80"
            )}
          />
        </Link>
      ))}
    </section>
  );
};
