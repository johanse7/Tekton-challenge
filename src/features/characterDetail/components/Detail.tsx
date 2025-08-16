import { ErrorHandler } from "@/components/ui/ErrorHandler";
import { CharacterStatus } from "@/features/characters/components/CharacterStatus";
import { LikeButton } from "@/features/characters/components/LikeButton";
import { useParams } from "react-router";
import { useGetSingleCharacter } from "../hooks/useGetSingleCharacter";
import { Location } from "./Location";
import { DetailSkeleton } from "./Skeletons";

export const Detail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useGetSingleCharacter(id!);

  if (isLoading) return <DetailSkeleton />;

  if (isError) return <ErrorHandler error={error} />;

  const {
    name,
    image,
    status,
    species,
    gender,
    type,
    location,
    id: characterId,
  } = character;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-7 py-8">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-auto rounded-lg object-cover"
        />
        <LikeButton
          characterId={characterId}
          className="absolute right-1 top-1"
        />
      </div>
      <div className="flex flex-col gap-2 items-start md:col-span-2">
        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300 ">
          {character.name}
        </h1>
        <CharacterStatus status={status} />
        <p className="text-gray-600 text-sm dark:text-gray-400">
          <span className="font-semibold">Species:</span> {species}
        </p>
        <p className="text-gray-600 text-sm dark:text-gray-400">
          <span className="font-semibold">Gender:</span> {gender}
        </p>
        {type && (
          <p className="text-gray-600 text-sm dark:text-gray-400">
            <span className="font-semibold">Type:</span> {type}
          </p>
        )}
        <Location locationUrl={location?.url} />
      </div>
    </section>
  );
};
