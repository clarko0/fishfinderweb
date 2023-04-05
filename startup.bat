@echo off

echo Starting Next.js development server...
start cmd /k "npm run dev"

echo Starting Python API server...
start cmd /k "python -u "c:\Users\arthu\fishfinder2\external\api.py""

echo Starting Nginx server...
start cmd /k "cd nginx && start nginx"

echo Starting Fisherman's Friend...
start cmd /k "python -u "C:\Users\arthu\fishfinder2\external\tools\fishfinder\main.py""

echo Startup complete!
pause
