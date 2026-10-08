@echo off
rem ---- Stop the portfolio dev server ------------------------------------
powershell -NoProfile -Command "$c = Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue; if ($c) { $c | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force; Write-Output ('Stopped PID ' + $_) } } else { Write-Output 'Dev server is not running.' }"
echo.
timeout /t 2 /nobreak >nul
