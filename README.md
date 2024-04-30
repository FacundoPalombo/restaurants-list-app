## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start viewing the page contents on `app/page.tsx` and so on.

## Run the unit tests



For running the unit tests you should use the `test` command

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```


## Run the end to end tests



First you should ensure that the development server is running, the end to end tests runs on localhost.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

After running the dev server, you should use the command `test:e2e` for running the end to end tests.
For e2e tests we are using playwright


```bash
npm run test:e2e
# or
yarn test:e2e
# or
pnpm test:e2e
# or
bun test:e2e
```


This will left you a coverage report that you can see after e2e tests finished, or you can see by yourself the last result on test-results/index.html