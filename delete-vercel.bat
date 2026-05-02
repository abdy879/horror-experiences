@echo off
cd /d C:\Users\M.Abdullah\CascadeProjects\horror-experiences

if exist vercel.json (
    echo Deleting vercel.json locally...
    del vercel.json
) else (
    echo vercel.json not found locally
)

echo Checking git status...
git status --short

echo Adding deletion to git...
git add vercel.json

echo Committing...
git commit -m "Delete vercel.json - fix deployment"

echo Pushing to GitHub...
git push origin main

echo Done!
pause
