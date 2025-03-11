:: desktop app의 renderer 폴더의 서브 폴더 개별 삭제
rmdir ..\mediabee-desktop-app\renderer\components /s /q
rmdir ..\mediabee-desktop-app\renderer\constants /s /q
rmdir ..\mediabee-desktop-app\renderer\pages /s /q
rmdir ..\mediabee-desktop-app\renderer\stores /s /q
rmdir ..\mediabee-desktop-app\renderer\styles /s /q
rmdir ..\mediabee-desktop-app\renderer\utils /s /q
rmdir ..\mediabee-desktop-app\renderer\public /s /q
del ..\mediabee-desktop-app\renderer\middleware.ts

:: src 폴더 서브폴더를 desktop app의 renderer 폴더로 복사
xcopy .\src ..\mediabee-desktop-app\renderer /i /s /y

:: public 폴더의 파일을 desktop app의 renderer public 폴더로 복사
mkdir ..\mediabee-desktop-app\renderer\public
xcopy .\public ..\mediabee-desktop-app\renderer\public /i /s /y

:: desktop app으로 이동
cd ..\mediabee-desktop-app

:: GroupIconPage.tsx 파일 교체
copy .\templates\GroupIconPage.tsx .\renderer\pages\

:: mediabee-front로 이동
cd ..
cd mediabee-front