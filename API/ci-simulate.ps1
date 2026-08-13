# Simuleaza env vars setate de CI (Jenkins/GitHub Actions)
# Acestea vor fi citite de System.getenv(key) in readKey()

$env:BASE_URL = "https://api.mapbox.com"
$env:LOG_LEVEL = "debug"
$env:TIMEOUT = "99"
$env:ENV_NAME = "QA"
$env:API_KEY = ""

Write-Host "CI env vars set:"
Write-Host "  BASE_URL  = $env:BASE_URL"
Write-Host "  LOG_LEVEL = $env:LOG_LEVEL"
Write-Host "  TIMEOUT   = $env:TIMEOUT"
Write-Host "  ENV_NAME  = $env:ENV_NAME"
Write-Host "  API_KEY  = $env:API_KEY"
Write-Host ""

# -Denv=qa -> qa.properties but will be override by env-vars
# Simulated just to test the override
mvn test -Denv=qa
mvn allure:report
mvn allure:serve

# Cleanup the environment variables
Remove-Item Env:BASE_URL
Remove-Item Env:LOG_LEVEL
Remove-Item Env:TIMEOUT
Remove-Item Env:ENV_NAME
Remove-Item Env:API_KEY
