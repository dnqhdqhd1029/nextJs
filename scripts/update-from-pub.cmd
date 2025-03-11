REM styles 폴더 삭제
rmdir /s /q .\src\styles

REM styles 폴더 생성
mkdir .\src\styles

REM pub 폴더로 이동
cd ..
cd mediabee-front-pub

REM update from repository
git pull

REM pub 폴더의 파일들을 mediabee-front로 복사
xcopy .\src\styles ..\mediabee-front\src\styles /i /s /y
xcopy .\public ..\mediabee-front\public /i /s /y

REM mediabee-front로 이동
cd ..
cd mediabee-front