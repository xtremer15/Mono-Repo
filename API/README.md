# API Automation Framework

This directory contains the backend API testing framework.

## 🛠️ Technology Stack
* **Language:** Java 17
* **Build Tool:** Maven
* **Testing Framework:** TestNG
* **API Client:** RestAssured
* **Reporting:** Allure

## 🚀 Setup & Installation

1. Ensure you have **JDK 17** installed and configured in your `JAVA_HOME`.
2. Ensure you have **Apache Maven** installed.
3. (Optional but recommended) Install the [Allure command-line tool](https://docs.qameta.io/allure/) for viewing reports locally.
4. Navigate to this directory and compile/resolve dependencies:
   ```bash
   cd API
   mvn clean compile
   ```

## 🧪 Running the Tests

To execute the entire test suite locally:
```bash
mvn clean test
```

## 🌍 Running per Environment
The framework is configured to accept environment variables via Maven properties. For example, to run tests against the `dev` or `qa` environment (which load from `src/main/resources/env/*.properties`):
```bash
mvn clean test -Denv=qa
mvn clean test -Denv=dev
```

## 📦 Creating a Test Suite
Test suites are managed via **TestNG XML** files located in `src/test/resources/`.
To create a new suite, simply create a new `.xml` file (e.g., `regression.xml`) and specify the classes or packages.
To run a specific suite (like the existing smoke suite):
```bash
mvn clean test -Dsurefire.suiteXmlFiles=src/test/resources/smoke.xml
```

## 📊 Viewing Reports
We use **Allure** for rich HTML reports.
After running the tests, generate and serve the Allure report locally using Maven:
```bash
mvn allure:serve
```
This will automatically compile the test results and open the report in your default web browser.
