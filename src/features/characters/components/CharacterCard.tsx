import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Character } from "../interfaces/character";
import { CharacterStatus } from "./CharacterStatus";
import { LikeButton } from "./LikeButton";

type CharacterCardProps = {
  character: Character;
};

export const CharacterCard = (props: CharacterCardProps) => {
  const { character } = props;
  const { name, gender, species, status, image, type } = character ?? {};

  return (
    <Card className="w-full hover:cursor-pointer hover:shadow-md transition-all duration-200 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-3">
        <div className="text-base font-semibold text-gray-500">{name}</div>
        <LikeButton />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <img src={image} alt={name} className="mb-4 rounded-2xl object-cover" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-1">
          <CharacterStatus status={status} />
          {species && (
            <span className="text-sm font-medium text-gray-500">{`- ${species}`}</span>
          )}
        </div>
        {gender && (
          <span className="text-sm font-medium text-gray-500">{gender}</span>
        )}
        {type && (
          <span className="text-sm font-medium text-gray-500">{type}</span>
        )}
      </CardFooter>
    </Card>
  );
};
