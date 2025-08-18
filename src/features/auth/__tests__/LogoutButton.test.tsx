import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockLogout = vi.fn();

beforeEach(() => {
  mockLogout.mockClear();
  useAuthStore.setState({ logout: mockLogout });
});

describe("LogoutButton", () => {
  it("renders correctly", () => {
    render(<LogoutButton />);

    expect(screen.getByText(/log out/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls logout on click", () => {
    render(<LogoutButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("accepts a custom className", () => {
    render(<LogoutButton className="custom-class" />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("custom-class");
  });
});
