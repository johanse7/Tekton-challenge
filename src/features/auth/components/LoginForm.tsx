import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { useActionState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

type FormState = {
  success: boolean;
  error?: string;
};

export const LoginForm = (props: React.ComponentProps<"div">) => {
  const { className, ...rest } = props;

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formState, formAction] = useActionState<FormState, FormData>(
    (_, formData) => {
      const email = formData.get("email")?.toString();
      const password = formData.get("password")?.toString();

      if (!email || !password) {
        return { success: false, error: "Email and password are required" };
      }

      const response = login(email, password);

      if (response.errorMessage) {
        return { success: false, error: response.errorMessage };
      }

      navigate("/", { replace: true });
      return { success: true };
    },
    { success: false }
  );
  return (
    <Card className={clsx("overflow-hidden p-0", className)} {...rest}>
      <CardContent className="grid p-0">
        <form
          className="p-6 md:p-8"
          action={formAction}
          aria-label="login form"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-balance text-muted-foreground">
                Login to your Rick and Morty account
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

            {formState?.error && (
              <p className="mt-3 text-sm text-red-600">{formState.error}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
