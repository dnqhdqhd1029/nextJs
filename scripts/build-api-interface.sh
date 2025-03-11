#!/bin/zsh

# usage
# ./scripts/build-api-interface.sh category이름

# api interface로 이동
cd ../api-interface-generator

# api interface build. category를 입력하지 않으면 전체 빌드
if [ -z "$1" ]
then
  npm run build:fo
else
  npm run build:fo --category=$1
fi

# mediabee-front로 이동
cd ../mediabee-front

# 기존 api interface 폴더 삭제
rm -rf ./src/types/api

# 빌드한 파일을 mediabee-backoffice로 압축 해제
cp -r ../api-interface-generator/api-interface/fo ./src/types/api
rm -rf ./src/types/api/**/.openapi-generator-ignore
rm -rf ./src/types/api/**/.openapi-generator


