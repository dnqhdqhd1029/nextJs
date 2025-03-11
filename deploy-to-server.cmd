for /f "tokens=*" %%i in ('type .env.local ^| findstr /v "^#"') do (
    set "%%i"
)

echo Deploying to server...

@echo off

docker login repo.mediapass.kr -u %DOCKER_USER_NAME% && (
  docker build -t repo.mediapass.kr/mediabee/frontend/mediabee-front .
  docker push repo.mediapass.kr/mediabee/frontend/mediabee-front
)