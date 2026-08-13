# UI Automation E2E

This directory contains the End-to-End (E2E) UI testing framework.

## 🛠️ Technology Stack
* **Language:** TypeScript
* **Framework:** [Playwright](https://playwright.dev/)
* **Engine:** Node.js (v20+)

## 🚀 Setup & Installation

1. Ensure you have **Node.js 20+** installed.
2. Navigate to this directory and install dependencies:
   ```bash
   cd UI
   npm ci
   ```
3. Install the required Playwright browsers:
   ```bash
   npx playwright install --with-deps
   ```

## 🧪 Running the Tests

You can execute the tests in different modes depending on your needs.

* **Headless (CLI) Mode** (Standard CI way):
  ```bash
  npm run test
  # or
  npx playwright test
  ```
* **UI Mode** (Interactive test runner with time-travel debugging):
  ```bash
  npm run test:ui
  ```

## 🌍 Running per Environment
To run tests against a specific environment, you can typically pass environment variables to Playwright:
```bash
cross-env ENV=qa npx playwright test
cross-env ENV=staging npx playwright test
```
*(Check `playwright.config.ts` to see exactly how environments are mapped).*

## 📦 Creating a Test Suite
In Playwright, suites are usually created using `test.describe` blocks inside the `*.spec.ts` files or by using project configurations in `playwright.config.ts` (e.g., separating Mobile vs Desktop or Smoke vs Regression).
To run a specific file or folder (suite):
```bash
npx playwright test tests/domain/opencart/checkout.spec.ts
```

## 📊 Viewing Reports
By default, Playwright generates a detailed HTML report. After a test run, view it by running:
```bash
npx playwright show-report
```
