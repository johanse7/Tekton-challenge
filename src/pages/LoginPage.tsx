import { LoginForm } from "../features/auth/components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <LoginForm className="w-full max-w-md mx-auto" />
    </div>
  );
};
