import type { ReactNode } from "react";
import { FaUser } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { MdFavorite } from "react-icons/md";

export const MENU: Array<{ label: string; href: string; icon: ReactNode }> = [
  {
    label: "Home",
    href: "/",
    icon: <GoHome size={20} />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <FaUser />,
  },
  {
    label: "Favorite characters",
    href: "/character/favorites",
    icon: <MdFavorite className="text-red-500" />,
  },
];
