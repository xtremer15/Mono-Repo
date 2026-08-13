import { devices, Project } from "@playwright/test";

const PLATFORMS = [
    { suffix: 'chromium', device: devices['Desktop Chrome'] },
    // { suffix: 'firefox', device: devices['Desktop Firefox'] },
    // { suffix: 'mobile-chrome', device: devices['Pixel 5'] },
    // { suffix: 'mobile-safari', device: devices['iPhone 12'] },
];

export const PROJECT_BROWSER_CONFIG: Project[] = PLATFORMS.map(platform => ({
    name: platform.suffix,
    testMatch: /.*\/domain\/.*\.spec\.ts/,
    use: { ...platform.device },
    retries: 3,
}));

