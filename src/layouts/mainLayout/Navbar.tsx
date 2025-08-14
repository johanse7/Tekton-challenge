import { DarkMode } from "./DarkMode";

export const Navbar = () => {
  return (
    <nav className="w-full h-16 p-6 shadow flex items-center justify-between bg-background">
      <span className="text-lg font-semibold">Rick and Morty</span>
      <DarkMode />
    </nav>
  );
};
