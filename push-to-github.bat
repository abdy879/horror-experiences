@echo off
cd /d C:\Users\M.Abdullah\CascadeProjects\horror-experiences
git add -A
git commit -m "Remove vercel.json - use Vercel auto-detection"
git push origin main
echo.
echo Push complete!
pause
