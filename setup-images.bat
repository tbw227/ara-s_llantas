@echo off
title Ara's Llantas - Setup Images Folder
echo.
echo ========================================
echo   Ara's Llantas - Setting Up Images
echo ========================================
echo.

echo Creating images folder structure...
echo.

cd /d "%~dp0frontend\public"

if not exist "images" (
    mkdir images
    echo Created: frontend\public\images\
) else (
    echo Images folder already exists
)

if not exist "images\tires" (
    mkdir images\tires
    echo Created: frontend\public\images\tires\
) else (
    echo Tires folder already exists
)

if not exist "images\logos" (
    mkdir images\logos
    echo Created: frontend\public\images\logos\
) else (
    echo Logos folder already exists
)

echo.
echo ========================================
echo   Image Folder Structure Created
echo ========================================
echo.
echo 📁 frontend\public\images\
echo    ├── tires\          (for tire images)
echo    └── logos\          (for brand logos)
echo.
echo Next steps:
echo 1. Add tire images to: frontend\public\images\tires\
echo 2. Add brand logos to: frontend\public\images\logos\
echo 3. Update tire data to reference correct image paths
echo.
echo Example tire images needed:
echo - michelin-tire.jpg
echo - bridgestone-tire.jpg
echo - goodyear-tire.jpg
echo - continental-tire.jpg
echo.
pause






