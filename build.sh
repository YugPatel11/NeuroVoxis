#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Build Frontend
echo "Building Frontend..."
cd frontend
npm install
npm run build
cd ..

# 2. Build Backend
echo "Building Backend..."
cd backend
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
