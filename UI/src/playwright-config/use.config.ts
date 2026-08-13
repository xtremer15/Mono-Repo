import { devices } from "@playwright/test";

export const USE_GLOBAL_SETUP: any = {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //ToDO:Set as mobile url then change angular module to be just for web
    // 'https://flutter-login-module.vercel.app/',
    baseURL: "https://ecommerce-playground.lambdatest.io/index.php?route=common/home",
    actionTimeout: 30000,
    navigationTimeout: 30000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // storageState: 'src/storageState.json',
    ...devices['Desktop Chrome'],

    acceptDownloads: false, // Accept downloads automatically

    // Credentials for HTTP authentication.
    // httpCredentials: {
    //     username: 'admin',
    //     password: 'admin',
    // },
    headless: true,

    // userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    // bypassCSP: true,

    // Whether to ignore HTTPS errors during navigation.
    ignoreHTTPSErrors: false,

    // Whether to emulate network being offline.
    offline: false,
    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',

    // Test isolation flow ('test' for unique user per test, 'worker' for shared user per worker)
    authIsolation: 'test',
}