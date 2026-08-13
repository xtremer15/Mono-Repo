import { defineConfig, devices } from '@playwright/test';
import { EXPECT_GLOBAL_SETUP } from './src/playwright-config/expect.config';
import { PROJECT_BROWSER_CONFIG } from './src/playwright-config/project-browser.config';
import { USE_GLOBAL_SETUP } from './src/playwright-config/use.config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 90000, // 90 seconds global test timeout
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  testIgnore: '*test-assets',
  workers: process.env.CI ? 4 : undefined,
  globalSetup: require.resolve('./src/global.setup.ts'),
  // globalTeardown: './src/global.teardown.ts',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'],
  ['html', { open: 'always' }],
  ['./custom-reporter/CustomReporterConfig.ts']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: USE_GLOBAL_SETUP,
  expect: EXPECT_GLOBAL_SETUP,
  /* Configure projects for major browsers */
  projects: PROJECT_BROWSER_CONFIG

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
