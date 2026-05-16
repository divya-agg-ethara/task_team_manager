# Deploy Team Task Manager API to Railway
# Requires: RAILWAY_TOKEN (https://railway.com/account/tokens)
# Usage:
#   $env:RAILWAY_TOKEN = "your-token"
#   .\scripts\deploy-railway.ps1

$ErrorActionPreference = "Stop"

if (-not $env:RAILWAY_TOKEN) {
  Write-Host "ERROR: Set RAILWAY_TOKEN first." -ForegroundColor Red
  Write-Host "  1. Open https://railway.com/account/tokens"
  Write-Host "  2. Create a token"
  Write-Host '  3. $env:RAILWAY_TOKEN = "your-token-here"'
  exit 1
}

$serverRoot = Split-Path $PSScriptRoot -Parent
Set-Location $serverRoot

Write-Host "Deploying from $serverRoot ..." -ForegroundColor Cyan

# Link if not linked (uses current directory + railway.json)
if (-not (Test-Path ".railway")) {
  Write-Host "Linking to Railway project (select your API service)..." -ForegroundColor Yellow
  npx @railway/cli link
}

Write-Host "Running deploy (build + migrate + start)..." -ForegroundColor Cyan
npx @railway/cli up --detach

Write-Host "Done. Open the Railway dashboard for logs and the public URL." -ForegroundColor Green
Write-Host "Health check: https://<your-domain>/api/v1/health"
