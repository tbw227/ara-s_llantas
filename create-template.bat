@echo off
echo ========================================
echo Creating Frontend Template on Desktop
echo ========================================
echo.

set "SOURCE=%~dp0frontend"
set "DEST=C:\Users\tbw22\Desktop\frontend-template"

echo Source: %SOURCE%
echo Destination: %DEST%
echo.

if exist "%DEST%" (
    echo Removing existing template folder...
    rmdir /s /q "%DEST%"
    timeout /t 1 /nobreak >nul
)

echo Creating destination folder...
mkdir "%DEST%"

echo.
echo Copying src folder...
xcopy "%SOURCE%\src" "%DEST%\src" /E /I /H /Y /Q

echo Copying public folder...
xcopy "%SOURCE%\public" "%DEST%\public" /E /I /H /Y /Q

echo Copying configuration files...
copy "%SOURCE%\tailwind.config.js" "%DEST%\" /Y >nul
copy "%SOURCE%\postcss.config.js" "%DEST%\" /Y >nul
copy "%SOURCE%\jsconfig.json" "%DEST%\" /Y >nul
if exist "%SOURCE%\.gitignore" copy "%SOURCE%\.gitignore" "%DEST%\" /Y >nul
if exist "%SOURCE%\env.production.example" copy "%SOURCE%\env.production.example" "%DEST%\" /Y >nul

echo.
echo Cleaning up...
if exist "%DEST%\src\node_modules" rmdir /s /q "%DEST%\src\node_modules"
if exist "%DEST%\public\node_modules" rmdir /s /q "%DEST%\public\node_modules"
if exist "%DEST%\src\build" rmdir /s /q "%DEST%\src\build"
if exist "%DEST%\public\build" rmdir /s /q "%DEST%\public\build"

echo.
echo ========================================
echo Template created successfully!
echo Location: %DEST%
echo ========================================
echo.
echo Next steps:
echo 1. Navigate to: %DEST%
echo 2. Run: npm install
echo 3. Run: npm start
echo.
pause

