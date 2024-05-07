import { test as baseTest, expect } from "@playwright/test";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const accountsJSON = require("./.auth/accounts.json");

import fs from "fs";
import path from "path";
import Login from "../tests/pageobjects/Login";

export * from "@playwright/test";
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`
      );

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({ storageState: undefined });

      // Acquire a unique account, for example create a new one.
      // Alternatively, you can have a list of precreated accounts for testing.
      // Make sure that accounts are unique, so that multiple team members
      // can run tests at the same time without interference.
      // const signup = new Signup(page) for creating new ones
      // .getStarted().doSignup() => payload[account[id]]; => [{ username, password } = account]
      const account = accountsJSON[id];
      const login = new Login(page);

      // Perform authentication steps. Replace these actions with your own.
      await login.getStarted();
      await login.doLogin();

      // Wait until the page receives the cookies.
      //
      // Sometimes login flow sets cookies in the process of several redirects.
      // Wait for the final URL to ensure that the cookies are actually set.
      await page.waitForURL("https://127.0.0.1/restaurants");

      // End of authentication steps.

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
