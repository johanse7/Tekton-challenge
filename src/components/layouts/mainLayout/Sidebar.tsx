import { LogoutButton } from "@/features/auth/components/LogoutButton";
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import { Navbar } from "./Navbar";

type SidebarProps = {
  isOPen: boolean;
  onClose: () => void;
};

export const Sidebar = (props: SidebarProps) => {
  const { isOPen, onClose } = props;

  return (
    <nav
      className={clsx(
        "fixed flex flex-col items-start p-5 right-0 top-0 w-full sm:w-[500px] overflow-y-hidden h-screen bg-background z-20 shadow-2xl transform transition-all duration-300 md:hidden",
        {
          "translate-x-full": !isOPen,
        }
      )}
    >
      <div className="flex flex-col flex-grow">
        <IoCloseOutline
          size={25}
          className="absolute top-3 right-5 cursor-pointer"
          onClick={onClose}
        />

        <div className="w-full h-px my-10 bg-gray-300 dark:bg-gray-600" />
        <Navbar className="flex flex-col items-start" onClick={onClose} />
      </div>
      <LogoutButton />
    </nav>
  );
};
