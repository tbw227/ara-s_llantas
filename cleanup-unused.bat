@echo off
echo Cleaning up unused files and folders...
echo.

if exist "frontend\plugins" (
    echo Removing plugins folder...
    rmdir /s /q "frontend\plugins"
    echo Plugins folder removed.
) else (
    echo Plugins folder not found.
)

if exist "frontend\build" (
    echo Removing build folder...
    rmdir /s /q "frontend\build"
    echo Build folder removed.
) else (
    echo Build folder not found.
)

echo.
echo Cleanup complete!
pause

