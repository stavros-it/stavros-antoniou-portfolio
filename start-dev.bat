@echo off
rem ---- Start portfolio dev server and open the site ------------------
cd /d "%~dp0"

rem Already running? Then just open the browser.
powershell -NoProfile -Command "try { Invoke-WebRequest -Uri 'http://localhost:5173' -UseBasicParsing -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel%==0 goto :open

echo Starting dev server...
start "portfolio-dev" /min cmd /c "npm run dev -- --port 5173 --strictPort > dev-server.log 2>&1"

rem Wait until the server answers (max ~20s)
set /a tries=0
:wait
timeout /t 2 /nobreak >nul
powershell -NoProfile -Command "try { Invoke-WebRequest -Uri 'http://localhost:5173' -UseBasicParsing -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel%==0 goto :open
set /a tries+=1
if %tries% lss 10 goto :wait
echo.
echo Server did not start in time. Check dev-server.log
pause
exit /b 1

:open
start "" "http://localhost:5173"
echo.
echo Portfolio running at http://localhost:5173
echo (To stop it later: run stop-dev.bat)
timeout /t 3 /nobreak >nul
