@echo off
title Ara's Llantas - Both Servers
echo.
echo ========================================
echo   Ara's Llantas - Starting Both Servers
echo ========================================
echo.
echo This will start both backend and frontend servers.
echo.
echo Backend will run on: http://localhost:8001
echo Frontend will run on: http://localhost:3000
echo.
echo Press any key to start both servers...
pause

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0node-backend && npm start"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:8001
echo Frontend: http://localhost:3000
echo.
echo Wait for both servers to fully start, then open:
echo http://localhost:3000
echo.
echo Press any key to exit this launcher...
pause





