import { Skeleton } from "@/components/ui/skeleton";

export const DetailSkeleton = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-3 gap-5 py-8"
      data-testid="detail-skeleton"
    >
      <Skeleton className="w-full h-80  rounded-lg" />
      <div className="flex flex-col gap-2 items-start md:col-span-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-32" />
      </div>
    </section>
  );
};

export const LocationSkeleton = () => {
  return (
    <article
      className="flex flex-col gap-2 mt-3"
      data-testid="location-skeleton"
    >
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="h-6 w-40" />
      </div>
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-36" />
    </article>
  );
};
