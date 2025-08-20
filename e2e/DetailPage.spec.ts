import { expect, test } from "@playwright/test";
import { login } from "./helpers";

test.describe("Character Detail", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, "rick@rick.com", "rick");
    await page.goto("/character/1");
  });

  test("should display character detail correctly", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Rick Sanchez", exact: true })
    ).toBeVisible();

    await expect(page.getByLabel("character-name")).toHaveText("Rick Sanchez");
    await expect(page.getByLabel("character-status")).toHaveText(
      /Alive|Dead|unknown/
    );
    await expect(page.getByLabel("character-species")).toHaveText(/Human/);
    await expect(page.getByLabel("character-gender")).toHaveText(
      /Male|Female|unknown/
    );

    const type = page.getByText(/Type:/);
    if (await type.isVisible()) {
      await expect(type).toBeVisible();
    }

    const likeButton = page.getByLabel("like-button");
    await expect(likeButton).toBeVisible();
  });

  test("Click like button to save character as a favorite", async ({
    page,
  }) => {
    const likeButton = page.getByLabel("like-button");
    await expect(likeButton).toBeVisible();

    if ((await likeButton.getAttribute("aria-pressed")) === "true") {
      await likeButton.click();
    }

    await likeButton.click();

    await page.goto("/character/favorites");

    const favoriteItem = page.getByLabel("favorite-item-1");
    await expect(favoriteItem).toBeVisible();
  });

  test("Click like button to undo favorite character", async ({ page }) => {
    const likeButton = page.getByLabel("like-button");
    await expect(likeButton).toBeVisible();

    if ((await likeButton.getAttribute("aria-pressed")) === "false") {
      await likeButton.click();
    }

    await likeButton.click();

    await page.goto("/character/favorites");

    const favoriteItem = page.getByLabel("favorite-item-1");
    await expect(favoriteItem).toHaveCount(0);
  });
});
