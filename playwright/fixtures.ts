import { test as baseTest, request } from "@playwright/test";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const accountsJSON = require("./.auth/accounts.json");

import fs from "fs";
import path from "path";
import { API_BASE_URL } from "@/app/utils/constants";

export * from "@playwright/test";
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({}, use) => {
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
      const context = await request.newContext({ storageState: undefined });

      //TODO: Acquire a unique account, for example create a new one.
      // Alternatively, you can have a list of precreated accounts for testing.
      // Make sure that accounts are unique, so that multiple team members
      // can run tests at the same time without interference.
      //? const signup = new Signup(page) for creating new ones
      // .getStarted().doSignup() => payload[account[id]]; => [{ username, password } = account]
      const account = accountsJSON[id];

      const userData = new FormData();

      userData.append("email", account.email);
      userData.append("password", account.password);

      // Get authorization and refreshtoken cookies.
      await context.post(API_BASE_URL + "/api/auth/login", {
        form: {
          email: account.email,
          password: account.password,
        },
      });

      // End of authentication steps.
      await context.storageState({ path: fileName });
      await context.dispose();

      await use(fileName);
    },
    { scope: "worker" },
  ],
});
