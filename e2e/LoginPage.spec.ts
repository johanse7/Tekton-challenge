import { expect, test } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth");
  });

  test("should display form fields", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Welcome back" })
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("should show error with invalid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("invalid");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText(/Invalid email or password/i)).toBeVisible();
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("rick@rick.com");
    await page.getByLabel("Password").fill("rick");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("/");
  });
});
  