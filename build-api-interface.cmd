@echo off
cd .. && (
    cd api-interface-generator && (
        npm run build:fo
    )
    cd .. && (
        cd mediabee-front && (
            rmdir /s /q .\src\types\api
            xcopy /e /i /y ..\api-interface-generator\api-interface\fo .\src\types\api\
            del /s /q .\src\types\api\service\.openapi-generator-ignore
            rmdir /s /q .\src\types\api\service\.openapi-generator

            npm run tsc
        )
    )
)
