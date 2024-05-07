import { test as setup, expect } from "@playwright/test";

import Login from "./pageobjects/Login";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  const login = new Login(page);
  await login.getStarted();
  await login.doLogin();

  await page.context().storageState({ path: authFile });
});
