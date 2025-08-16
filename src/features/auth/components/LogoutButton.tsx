import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { TbLogout2 } from "react-icons/tb";
import { useAuthStore } from "../store/useAuthStore";

type LogoutButtonProps = {
  className: string;
};

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Button
      className={clsx("text-base", className)}
      variant="ghost"
      onClick={logout}
    >
      <span>Log out</span>
      <TbLogout2 size={25} />
    </Button>
  );
};
