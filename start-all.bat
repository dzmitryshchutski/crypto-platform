@echo off
title 🚀 Crypto Platform Starter
echo =======================================
echo   Запуск Crypto Platform (Backend+Frontend)
echo =======================================

:: Запуск backend
echo 🔧 Запуск backend (Django)...
start cmd /k "cd backend && venv\Scripts\activate && python manage.py runserver"

:: Запуск frontend
echo 🎨 Запуск frontend (Next.js)...
start cmd /k "cd frontend && npm run dev"

echo ✅ Оба сервера запущены!
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo =======================================
pause
