# NeuroVoxis One-Click Setup Script
# This script automates the installation of backend and frontend dependencies.

Write-Host "🚀 Starting NeuroVoxis Setup..." -ForegroundColor Cyan

# 1. Check for Python
if (!(Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Error "❌ Python is not installed. Please install Python 3.10+ and add it to your PATH."
    exit 1
}

# 2. Check for Node.js
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "❌ Node.js/npm is not installed. Please install Node.js and try again."
    exit 1
}

# 3. Setup Backend
Write-Host "`n📦 Setting up Backend..." -ForegroundColor Yellow
cd backend

if (!(Test-Path venv)) {
    Write-Host "Creating virtual environment..."
    python -m venv venv
}

Write-Host "Installing backend dependencies (this may take a few minutes)..."
.\venv\Scripts\python.exe -m pip install -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Backend installation failed."
    cd ..
    exit 1
}

cd ..

# 4. Setup Frontend
Write-Host "`n⚛️ Setting up Frontend..." -ForegroundColor Yellow
cd frontend

Write-Host "Installing frontend dependencies..."
npm install --legacy-peer-deps

if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Frontend installation failed."
    cd ..
    exit 1
}

cd ..

Write-Host "`n✅ Setup Complete! NeuroVoxis is ready to go." -ForegroundColor Green
Write-Host "To start the backend: cd backend; .\venv\Scripts\python.exe manage.py runserver"
Write-Host "To start the frontend: cd frontend; npm run dev"
