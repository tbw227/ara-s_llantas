@echo off
echo Cleaning up unused files and folders...
echo.

if exist "tests" (
    echo Removing empty tests folder...
    rmdir /s /q "tests"
    echo Tests folder removed.
) else (
    echo Tests folder not found.
)

if exist "nginx" (
    echo Removing empty nginx folder...
    rmdir /s /q "nginx"
    echo Nginx folder removed.
) else (
    echo Nginx folder not found.
)

if exist "frontend\plugins" (
    echo Removing empty plugins folder...
    rmdir /s /q "frontend\plugins"
    echo Plugins folder removed.
) else (
    echo Plugins folder not found.
)

echo.
echo Cleanup complete!
pause

