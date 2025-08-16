import { Title } from "@/components/ui/Title";
import { CharacterList } from "@/features/characters/components/CharacterList";
import { CurrentFilters } from "@/features/characters/components/CurrentFilters";
import { Search } from "@/features/characters/components/Search";

export const CharactersPage = () => {
  return (
    <>
      <Title>Character list</Title>
      <Search className="my-4" />
      <CurrentFilters />
      <CharacterList />
    </>
  );
};
