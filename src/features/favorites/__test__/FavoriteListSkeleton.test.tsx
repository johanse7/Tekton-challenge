import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FavoriteListSkeleton } from "../components/FavoriteListSkeleton";

describe("FavoriteListSkeleton", () => {
  it("renders 12 skeleton items", () => {
    render(<FavoriteListSkeleton />);

    const skeletonSection = screen.getByTestId("favorite-list-skeleton");
    expect(skeletonSection).toBeInTheDocument();

    const articles = skeletonSection.querySelectorAll("article");
    expect(articles.length).toBe(12);
  });
});
