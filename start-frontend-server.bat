@echo off
title Ara's Llantas Frontend Server
echo.
echo ========================================
echo   Ara's Llantas Frontend Server
echo ========================================
echo.
echo Starting frontend server...
echo.

cd /d "%~dp0frontend"

echo Current directory: %CD%
echo.
echo Running: npm start
echo.

npm start

echo.
echo Frontend server stopped.
pause





