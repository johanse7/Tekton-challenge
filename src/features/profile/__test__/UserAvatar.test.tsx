import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { fakeUsers } from "@/features/auth/utils";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAvatar } from "../components/UserAvatar";

beforeEach(() => {
  useAuthStore.setState({ user: null });
});

describe("UserAvatar", () => {
  const [user] = fakeUsers;
  it("renders nothing if user is null", () => {
    const { container } = render(<UserAvatar />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders user avatar and name when user exists", () => {
    useAuthStore.setState({ user: { ...user, token: "fake-token" } });

    render(<UserAvatar />);

    const img = screen.getByRole("img", { name: /avatar-Rick Sanchez/i });
    expect(img).toHaveAttribute("src", user.avatar);
    expect(img).toHaveAttribute("alt", `avatar-${user.name}`);

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
});
