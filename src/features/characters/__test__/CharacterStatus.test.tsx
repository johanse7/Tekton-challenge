import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CharacterStatus } from "../components/CharacterStatus";
import type { StatusType } from "../interfaces/character";

describe("CharacterStatus component", () => {
  const renderComponent = (status: StatusType | "Other") =>
    render(<CharacterStatus status={status as StatusType} />);

  it("renders Alive status with green dot", () => {
    renderComponent("Alive");

    expect(screen.getByText("Alive")).toBeInTheDocument();
    const dot = screen.getByRole("presentation");
    expect(dot).toHaveClass("bg-green-500");
  });

  it("renders Dead status with red dot", () => {
    renderComponent("Dead");

    expect(screen.getByText("Dead")).toBeInTheDocument();
    const dot = screen.getByRole("presentation");
    expect(dot).toHaveClass("bg-red-500");
  });

  it("renders Unknown status with gray dot", () => {
    renderComponent("Unknown");

    expect(screen.getByText("Unknown")).toBeInTheDocument();
    const dot = screen.getByRole("presentation");
    expect(dot).toHaveClass("bg-gray-500");
  });

  it("falls back to gray when status is unexpected", () => {
    renderComponent("Other");

    expect(screen.getByText("Other")).toBeInTheDocument();
    const dot = screen.getByRole("presentation");
    expect(dot).toHaveClass("bg-gray-500");
  });
});
