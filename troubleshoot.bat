@echo off
title Ara's Llantas - Troubleshooting
echo.
echo ========================================
echo   Ara's Llantas - Troubleshooting
echo ========================================
echo.

echo Checking project structure...
echo.

if not exist "node-backend" (
    echo ERROR: node-backend directory not found!
    goto :error
)

if not exist "frontend" (
    echo ERROR: frontend directory not found!
    goto :error
)

if not exist "node-backend\package.json" (
    echo ERROR: node-backend\package.json not found!
    goto :error
)

if not exist "frontend\package.json" (
    echo ERROR: frontend\package.json not found!
    goto :error
)

echo Project structure looks good!
echo.

echo Checking if ports are available...
netstat -an | findstr ":8001" > nul
if %errorlevel% == 0 (
    echo WARNING: Port 8001 is already in use
) else (
    echo Port 8001 is available
)

netstat -an | findstr ":3000" > nul
if %errorlevel% == 0 (
    echo WARNING: Port 3000 is already in use
) else (
    echo Port 3000 is available
)

echo.
echo ========================================
echo   Troubleshooting Complete
echo ========================================
echo.
echo If everything looks good, try running:
echo   start-both-servers.bat
echo.
echo Or start servers individually:
echo   start-backend-server.bat
echo   start-frontend-server.bat
echo.
goto :end

:error
echo.
echo ========================================
echo   Issues Found - Please Fix Them
echo ========================================
echo.

:end
pause





