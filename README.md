# QA Takeaway Assignment

Welcome to the QA Automation Monorepo! This repository contains the complete automation testing suite, separated into three main domains: **API**, **UI**, and **Performance (Perf)** testing.

## 🏗️ Repository Architecture

This project is structured as a **Monorepo**. Instead of having separate repositories for each testing type, everything is consolidated here. 

### Continuous Integration (CI) Workflows
We utilize **GitHub Actions** to maintain true independence between the projects. The CI architecture is designed so that each project has its own isolated pipeline:

- **Path-Based Triggers**: A workflow only runs if changes are made to its specific directory. (e.g., modifying a file in `UI/` will only trigger the UI pipeline).
- **Isolated Environments**: Each pipeline defines its own runner environment (Java for API, Node.js for UI, Docker/k6 for Perf).
- **Artifacts Generation**: Every workflow run generates its own isolated test report (Allure, Playwright HTML, k6 HTML) available for download in the GitHub Actions tab.
- **Slack Notifications**: All pipelines are configured to send automated execution statuses directly to Slack upon completion.

The workflow configurations can be found in the `.github/workflows/` directory:
- ⚙️ `.github/workflows/api-ci.yml`
- 🖥️ `.github/workflows/ui-ci.yml`
- 🚀 `.github/workflows/perf-ci.yml`

---

## 📁 Project Structure

The repository is divided into the following three independent directories. *(More detailed documentation for each will be provided in their respective folders).*

### 1. `API/` (Backend Automation)
- **Tech Stack:** Java 17, Maven, RestAssured.
- **Description:** Contains the automated API test suite for backend services. 
- **Reporting:** Uses Allure for rich, interactive test reporting.

### 2. `UI/` (Frontend E2E Automation)
- **Tech Stack:** TypeScript, Node.js (v20), Playwright.
- **Description:** Contains end-to-end automated tests simulating real user journeys through the web application.
- **Reporting:** Uses the built-in Playwright HTML reporter.

### 3. `Perf/` (Performance & Load Testing)
- **Tech Stack:** JavaScript/TypeScript, Grafana k6.
- **Description:** Contains load, stress, and performance scripts meant to test the application under various workloads and traffic conditions.
- **Reporting:** Generates k6 HTML summary reports.

---
*Note: To set up the Slack notifications, ensure that the `SLACK_WEBHOOK_URL` secret is configured in the repository settings.*
