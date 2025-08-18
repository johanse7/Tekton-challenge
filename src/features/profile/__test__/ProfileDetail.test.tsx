import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { fakeUsers } from "@/features/auth/utils";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ProfileDetail } from "../components/ProfileDetail";

beforeEach(() => {
  useAuthStore.setState({ user: null });
});

describe("ProfileDetail", () => {
  const [user] = fakeUsers;
  it("renders nothing if user is null", () => {
    const { container } = render(<ProfileDetail />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders user details when user exists", () => {
    useAuthStore.setState({ user: { ...user, token: "fake-token" } });

    render(<ProfileDetail />);

    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(/rick@rick.com/i)).toBeInTheDocument();

    const img = screen.getByRole("img", { name: /Rick Sanchez/i });
    expect(img).toHaveAttribute("src", user.avatar);
    expect(img).toHaveAttribute("alt", user.name);
  });
});
