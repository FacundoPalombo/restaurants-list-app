import { test, expect } from "@playwright/test";
import Login from "../pageobjects/Login";

test("page loads", async ({ page }) => {
  const login = new Login(page);

  await login.getStarted();
});

test("user can login", async ({ page }) => {
  const login = new Login(page);

  await login.getStarted();

  await login.doLogin();

  // this assert is only if an account will be fully created
  // await expect(page.url()).toContain("/login");
});

test("user can go back to signup", async ({ page }) => {
  const login = new Login(page);

  await login.getStarted();

  await login.goBackToSignup();

  await expect(page.url()).toContain("/restaurants");
});

test("user can logout session", async ({ page }) => {
  const login = new Login(page);

  await login.getStarted();

  await login.doLogout();

  await expect(page.url()).toContain("/login");
});
