import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const ProfileDetail = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const { name, email, avatar } = user;

  return (
    <Card className="rounded-xl shadow-md p-6 mt-10">
      <CardHeader className="w-full">
        <img
          className="h-80 w-80 rounded-full object-cover"
          src={avatar}
          alt={name}
        />
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-semibold">Name:</span> {name}
        </p>
        <p className="text-gray-600  dark:text-gray-400">
          <span className="font-semibold">Email:</span> {email}
        </p>
      </CardContent>
    </Card>
  );
};
