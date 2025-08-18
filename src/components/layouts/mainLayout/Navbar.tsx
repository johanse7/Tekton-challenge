import { cn } from "@/lib/utils";
import { MENU } from "@/mocks";
import { NavLink } from "react-router";

type NavbarProps = {
  className?: string;
  onClick?: () => void;
};

export const Navbar = ({ className, onClick }: NavbarProps) => {
  return (
    <nav className={cn("hidden lg:flex items-center gap-4", className)}>
      {MENU.map(({ label, icon, href }, index) => (
        <NavLink
          key={`menu-${label}-${index}`}
          className={({ isActive }) =>
            cn(
              "flex  gap-2 font-medium text-sidebar-ring hover:text-sidebar-foreground transition-all items-center rounded-lg px-2 py-",
              {
                "text-sidebar-foreground": isActive,
              }
            )
          }
          to={href}
          onClick={onClick}
          end
        >
          <span>{label}</span>
          {icon}
        </NavLink>
      ))}
    </nav>
  );
};
