@echo off
title Ara's Llantas - Tire Images Setup
echo.
echo ========================================
echo   Ara's Llantas - Tire Images Setup
echo ========================================
echo.

echo Creating tire image folders...
echo.

cd /d "%~dp0frontend\public\images"

if not exist "tires" (
    mkdir tires
    echo Created: frontend\public\images\tires\
)

echo.
echo ========================================
echo   Tire Images Needed
echo ========================================
echo.

echo 📁 Lawn Tires (place in frontend\public\images\tires\)
echo    - carlisle-lawn-tire.jpg
echo    - lawn-tire-generic.jpg  
echo    - lawn-tire-tread.jpg
echo.

echo 📁 Motorcycle Tires (place in frontend\public\images\tires\)
echo    - michelin-motorcycle-tire.jpg
echo    - bridgestone-motorcycle-tire.jpg
echo    - motorcycle-tire-generic.jpg
echo    - sport-bike-tire.jpg
echo    - cruiser-tire.jpg
echo.

echo ========================================
echo   Instructions
echo ========================================
echo.

echo 1. Take photos of actual tires
echo 2. Resize to 400x400 pixels
echo 3. Save as JPG files with the names above
echo 4. Place in: frontend\public\images\tires\
echo 5. Restart the backend server to see changes
echo.

echo 📋 Visual guide available at:
echo    frontend\public\images\tires\tire-images-needed.html
echo.

pause





