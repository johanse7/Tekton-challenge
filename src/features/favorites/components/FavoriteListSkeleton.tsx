import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

export const FavoriteListSkeleton = () => {
  const skeletonItems = Array.from({ length: 12 });

  return (
    <section
      className="columns-2 md:columns-3 lg:columns-4 gap-5 py-10 md:py-20"
      data-testid="favorite-list-skeleton"
    >
      {skeletonItems.map((_, index) => (
        <article
          key={index}
          className="mb-5 break-inside-avoid rounded-lg overflow-hidden shadow-md"
        >
          <Skeleton
            className={clsx(
              "w-full",
              index % 2 ? "h-40 md:h-40" : "h-60 md:h-80"
            )}
          />
        </article>
      ))}
    </section>
  );
};
