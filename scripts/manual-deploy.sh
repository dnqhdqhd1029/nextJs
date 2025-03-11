#!/bin/bash

# 최신 코드를 가져옵니다.
echo "Pulling latest code from Git repository..."
git pull || { echo "Git pull failed"; exit 1; }

# NPM Cache를 삭제합니다.
echo "Clearing npm cache..."
npm cache clean --force || { echo "npm cache clean failed"; exit 1; }

# NPM 패키지를 설치합니다.
echo "Installing npm packages..."
npm install || { echo "npm install failed"; exit 1; }

# 애플리케이션을 빌드합니다.
echo "Building the application..."
npm run build || { echo "npm run build failed"; exit 1; }

# PM2를 사용하여 애플리케이션을 재시작합니다.
echo "Restarting the application with PM2..."
pm2 stop "mediabee-front" || true
pm2 delete "mediabee-front" || true
pm2 start npm --name "mediabee-front" -- start
