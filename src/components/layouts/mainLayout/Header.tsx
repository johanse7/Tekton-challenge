import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { UserAvatar } from "@/features/profile/components/UserAvatar";
import { useToggle } from "@/hooks";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router";
import { DarkMode } from "./DarkMode";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Header = () => {
  const [openSidebarMobile, setOpenSidebarMobile] = useToggle();

  return (
    <header className="w-full p-6 shadow flex items-center justify-between bg-accent">
      <Link to="/characters" className="text-lg font-semibold">
        Rick and Morty
      </Link>
      <Navbar />
      <Sidebar isOpen={openSidebarMobile} onClose={setOpenSidebarMobile} />
      <div className="flex gap-1 items-center">
        <Button
          size="icon"
          variant="ghost"
          className="block md:hidden"
          onClick={setOpenSidebarMobile}
        >
          <IoMdMenu size={25} />
        </Button>
        <LogoutButton className="hidden md:flex" />
        <DarkMode />
        <UserAvatar className="hidden md:flex" />
      </div>
    </header>
  );
};
