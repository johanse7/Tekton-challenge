import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { fakeUsers } from "../utils";

const mockNavigate = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  useAuthStore.setState({ user: null });
  mockNavigate.mockClear();
});

describe("Login Form", async () => {
  it("renders with success", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: fakeUsers[0].email },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: fakeUsers[0].password },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
