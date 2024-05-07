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

  // this assert is only if an account will be fully created
  // await expect(page.url()).toContain("/login");
});

test("user can turn back to login", async ({ page }) => {
  const signup = new Signup(page);

  await signup.getStarted();

  await signup.doReturnLogin();

  await expect(page.url()).toContain("/login");
});
