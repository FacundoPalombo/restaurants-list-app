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
});

test("user can go back to signup", async ({ page }) => {
  const login = new Login(page);

  await login.getStarted();

  await login.goBackToSignup();
});

test("user can logout session", async ({ page }) => {
  const login = new Login(page);

  await login.getStarted();

  await login.doLogout();
});
