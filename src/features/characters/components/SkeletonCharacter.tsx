import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type CharacterListSkeletonProps = {
  count?: number;
};

export const CharacterListSkeleton = ({
  count = 9,
}: CharacterListSkeletonProps) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 ">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <CharacterCardSkeleton />
        </li>
      ))}
    </ul>
  );
};

const CharacterCardSkeleton = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center py-6">
        <Skeleton className="w-75 h-75 md:w-70 md:h-70 rounded-2xl" />
      </CardContent>

      <CardFooter className="flex flex-col gap-2 items-start w-full">
        <div className="flex items-center gap-1 w-full">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </CardFooter>
    </Card>
  );
};
