@echo off
echo Starting Django Backend...
cd backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing dependencies...
pip install -r requirements.txt

echo Running migrations...
python manage.py makemigrations
python manage.py migrate

echo Starting server...
python manage.py runserver

pause 