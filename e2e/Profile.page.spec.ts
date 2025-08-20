import { expect, test } from "@playwright/test";
import { login } from "./helpers";

test.describe("Profile Page", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, "rick@rick.com", "rick");

    await page.goto("/profile");
  });

  test("should display profile page title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "User Profile" })
    ).toBeVisible();
  });

  test("should display user details", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Rick Sanchez", exact: true })
    ).toBeVisible();
    await expect(page.getByText("Name: Rick Sanchez")).toBeVisible();
    await expect(page.getByText("Email: rick@rick.com")).toBeVisible();
  });
});
