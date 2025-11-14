@echo off
title Ara's Llantas Backend Server
echo.
echo ========================================
echo   Ara's Llantas Backend Server
echo ========================================
echo.
echo Starting backend server...
echo.

cd /d "%~dp0node-backend"

echo Current directory: %CD%
echo.
echo Running: npm start
echo.

npm start

echo.
echo Backend server stopped.
pause







