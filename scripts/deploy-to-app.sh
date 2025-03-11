#!/bin/bash

# desktop app의 renderer 폴더의 서브 폴더 개별 삭제
rm -rf ../mediabee-desktop-app/renderer/components
rm -rf ../mediabee-desktop-app/renderer/constants
rm -rf ../mediabee-desktop-app/renderer/pages
rm -rf ../mediabee-desktop-app/renderer/stores
rm -rf ../mediabee-desktop-app/renderer/styles
rm -rf ../mediabee-desktop-app/renderer/utils
rm -rf ../mediabee-desktop-app/renderer/public
rm ../mediabee-desktop-app/renderer/middleware.ts

# src 폴더 서브폴더를 desktop app의 renderer 폴더로 복사
cp -r ./src/* ../mediabee-desktop-app/renderer/

# public 폴더의 파일을 desktop app의 renderer public 폴더로 복사
mkdir -p ../mediabee-desktop-app/renderer/public
cp -r ./public/* ../mediabee-desktop-app/renderer/public/

# desktop app으로 이동
cd ../mediabee-desktop-app

# home.tsx 파일 교체
cp -r ./templates/home.tsx ./renderer/pages/

# mediabee-front로 이동
cd ..
cd mediabee-front
