import { test, expect } from "@playwright/test";
import Home from "../pageobjects/Home";

test("page loads", async ({ page }) => {
  const home = new Home(page);

  await home.getStarted();
});

test("page navigates to signup", async ({ page }) => {
  const home = new Home(page);

  await home.getStarted();

  await home.buttonRedirects();
});
