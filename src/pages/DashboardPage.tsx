import { CharacterList } from "@/features/characters/components/CharacterList";
import { CurrentFilters } from "@/features/characters/components/CurrentFilters";
import { Search } from "@/features/characters/components/Search";

export const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Character list</h1>
      <Search className="mt-4 " />
      <CurrentFilters />
      <CharacterList />
    </div>
  );
};
