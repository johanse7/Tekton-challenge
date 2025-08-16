import { cn } from "@/lib/utils";
import { useAuthStore } from "../../auth/store/useAuthStore";

type UserAvatarProps = {
  className?: string;
};
export const UserAvatar = ({ className }: UserAvatarProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <img
        src={user.avatar}
        alt={`avatar-${user.name}`}
        className="object-cover rounded-full  h-16 w-16 md:w-10 md:h-10 border-border border"
      />
      <span className="text-sm text-foreground font-medium">{user.name}</span>
    </div>
  );
};
