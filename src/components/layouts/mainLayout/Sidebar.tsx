import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { UserAvatar } from "@/features/profile/components/UserAvatar";
import { useMediaQuery } from "@uidotdev/usehooks";
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import { RemoveScroll } from "react-remove-scroll";
import { Navbar } from "./Navbar";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = (props: SidebarProps) => {
  const { isOpen, onClose } = props;

  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <RemoveScroll enabled={isOpen && !isDesktop} removeScrollBar={false}>
      <nav
        className={clsx(
          "fixed flex flex-col items-start p-5 right-0 top-0 w-full sm:w-[500px] overflow-y-hidden h-svh bg-background z-20 shadow-2xl transform transition-all duration-300 md:hidden",
          {
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex flex-col flex-grow w-full">
          <div className="flex items-center justify-between">
            <UserAvatar />
            <IoCloseOutline
              size={25}
              className="absolute top-3 right-5 cursor-pointer"
              onClick={onClose}
            />
          </div>

          <Navbar
            className="flex my-10 flex-col items-start"
            onClick={onClose}
          />
        </div>
        <LogoutButton />
      </nav>
    </RemoveScroll>
  );
};
