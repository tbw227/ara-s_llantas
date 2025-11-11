@echo off
title Ara's Llantas - Run Tests
echo.
echo ========================================
echo   Ara's Llantas - Running Tests
echo ========================================
echo.

echo Running Backend Tests...
echo.
cd /d "%~dp0node-backend"
if not exist "package.json" (
    echo ERROR: Backend package.json not found!
    goto :error
)
call npm test
if %errorlevel% neq 0 (
    echo Backend tests failed!
    goto :error
)

echo.
echo Backend tests passed!
echo.

echo Running Frontend Tests...
echo.
cd /d "%~dp0frontend"
if not exist "package.json" (
    echo ERROR: Frontend package.json not found!
    goto :error
)
call npm test -- --watchAll=false
if %errorlevel% neq 0 (
    echo Frontend tests failed!
    goto :error
)

echo.
echo ========================================
echo   All Tests Passed!
echo ========================================
echo.
echo Backend tests: PASSED
echo Frontend tests: PASSED
echo.
goto :end

:error
echo.
echo ========================================
echo   Tests Failed - Check Output Above
echo ========================================
echo.

:end
pause





