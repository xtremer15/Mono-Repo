# Performance & Load Testing

This directory contains the performance testing framework used to measure system behavior under load.

## 🛠️ Technology Stack
* **Language:** JavaScript / TypeScript (esbuild)
* **Framework:** [Grafana k6](https://k6.io/)

## 🚀 Setup & Installation

1. Install **Node.js** to manage scripts and dependencies.
2. Install **k6** globally on your machine (e.g., via Homebrew, apt, or downloading the binary from [k6.io](https://k6.io/docs/getting-started/installation/)).
3. Install project dependencies:
   ```bash
   cd Perf
   npm install
   ```
4. Build the TypeScript files to JavaScript bundles (required before running k6):
   ```bash
   npm run build
   ```

## 🧪 Running the Tests

To run the load tests locally:
```bash
npm run test
```

## 🌍 Running per Environment & Workloads
You can specify the target environment and the workload profile by passing environment variables to the k6 runner.
For example, to run tests against QA using a "load" profile:
```bash
npm run test:qa
# or directly:
k6 run -e TARGET_ENV=qa -e WORKLOAD=load dist/homepage.spec.bundle.js
```

## 📊 Viewing Reports
* The tests generate a local `html-report.html`. Open this file in your browser to see a rich HTML summary of the load test.
* You can also run the web dashboard (if configured) via:
  ```bash
  npm run test:dashboard
  ```
