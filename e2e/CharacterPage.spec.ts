import { expect, test } from "@playwright/test";
import { login } from "./helpers";

test.describe("Characters Page", () => {
  test.beforeEach(async ({ page }) => {
    // login primero
    await login(page, "rick@rick.com", "rick");

    await page.goto("/");
  });

  test("should display characters list correctly", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Character list" })
    ).toBeVisible();

    const searchInput = page.getByPlaceholder("Search or filter characters");
    await expect(searchInput).toBeVisible();

    const characterCards = page.locator('[aria-label="character-card"]');
    await expect(characterCards.first()).toBeVisible();
  });

  test("should filter characters by search", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search or filter characters");

    await searchInput.fill("Rick");

    const currentFilters = page.getByLabel("current-filters");
    await expect(currentFilters).toContainText(/Rick/i);

    const firstCard = page.locator('[aria-label="character-card"]').first();
    await expect(firstCard).toContainText(/Rick/);
  });

  test("should remove search filter", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search or filter characters");
    await searchInput.fill("Morty");

    const currentFilters = page.getByLabel("current-filters");
    await expect(currentFilters).toContainText(/Morty/i);

    const removeButton = currentFilters.getByRole("button");
    await removeButton.click();

    await expect(currentFilters).toHaveCount(0);

    const characterCards = page.locator('[aria-label="character-card"]');
    await expect(characterCards.first()).toBeVisible();
  });

  test("should load more characters when scrolling", async ({ page }) => {
    const characterCards = page.locator('[aria-label="character-card"]');

    const initialCount = await characterCards.count();
    await page.mouse.wheel(0, 5000);

    await expect(characterCards.nth(initialCount)).toBeVisible();
  });
});
