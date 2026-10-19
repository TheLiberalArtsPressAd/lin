@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 正在啟動「天堂ARPG 官方資料庫」本機伺服器...
echo.
python serve.py
if errorlevel 1 (
  echo.
  echo 找不到 Python，改用 Node.js 啟動...
  npx --yes serve . -l 8000
)
pause
