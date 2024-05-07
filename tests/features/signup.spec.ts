import { test, expect } from "@playwright/test";
import Signup from "../pageobjects/Signup";

test("page loads", async ({ page }) => {
  const signup = new Signup(page);

  await signup.getStarted();
});

test("user can create an account", async ({ page }) => {
  const signup = new Signup(page);

  await signup.getStarted();

  await signup.doSignup();
  // await expect(page.url()).toContain("/login");
});
