# 🚀 Мини-криптоплатформа

Веб-приложение для отслеживания криптовалют и управления избранным.

## ✨ Функционал

- 🔐 Регистрация и авторизация через JWT
- 📊 Просмотр списка популярных криптовалют (CoinGecko API)
- ❤️ Добавление криптовалют в избранное
- 📋 Управление списком избранного
- 🎨 Современный UI с Tailwind CSS

## 🏗️ Архитектура

- **Backend**: Django + Django REST Framework
- **Frontend**: Next.js 15 + TypeScript
- **База данных**: SQLite
- **Аутентификация**: JWT токены
- **API**: CoinGecko для данных о криптовалютах

## 📁 Структура проекта

```
crypto-platform/
├── backend/                 # Django backend
│   ├── crypto_platform/    # Основной проект Django
│   ├── crypto_api/         # Приложение для API
│   ├── manage.py           # Django CLI
│   └── requirements.txt    # Python зависимости
├── frontend/               # Next.js frontend
│   ├── app/                # App Router страницы
│   ├── components/         # React компоненты
│   ├── contexts/           # React контексты
│   ├── services/           # API сервисы
│   └── package.json        # Node.js зависимости
└── README.md               # Документация
```

## 🚀 Быстрый старт

### 1. Backend (Django)

```bash
cd backend

# Создание виртуального окружения
python -m venv venv

# Активация виртуального окружения
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Установка зависимостей
pip install -r requirements.txt

# Применение миграций
python manage.py makemigrations
python manage.py migrate

# Создание суперпользователя (опционально)
python manage.py createsuperuser

# Запуск сервера
python manage.py runserver
```

Backend будет доступен по адресу: http://localhost:8000

### 2. Frontend (Next.js)

```bash
cd frontend

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

Frontend будет доступен по адресу: http://localhost:3000

## 🔌 API Endpoints

### Аутентификация
- `POST /api/register/` - Регистрация пользователя
- `POST /api/login/` - Вход в систему
- `POST /api/token/refresh/` - Обновление JWT токена

### Криптовалюты
- `GET /api/cryptos/` - Список криптовалют (CoinGecko)

### Избранное
- `GET /api/favorites/` - Получить избранное пользователя
- `POST /api/favorites/` - Добавить в избранное
- `DELETE /api/favorites/{id}/` - Удалить из избранного

## 🎯 Основные страницы

1. **Главная** (`/`) - Редирект на криптовалюты
2. **Криптовалюты** (`/cryptos`) - Список всех криптовалют
3. **Избранное** (`/favorites`) - Личный список избранного
4. **Авторизация** (`/auth`) - Вход/регистрация

## 🛠️ Технологии

### Backend
- Django 4.2.7
- Django REST Framework 3.14.0
- JWT аутентификация
- SQLite база данных

### Frontend
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Axios для HTTP запросов
- Lucide React для иконок

## 🔧 Настройка

### Переменные окружения

Создайте файл `.env` в папке `backend`:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### CORS настройки

Frontend настроен для работы с backend на `localhost:8000`. Если порт отличается, обновите настройки в `frontend/next.config.js`.

## 📱 Особенности

- **Responsive дизайн** - адаптируется под все устройства
- **JWT аутентификация** - безопасная авторизация
- **Real-time данные** - актуальная информация о криптовалютах
- **Удобный UI** - интуитивно понятный интерфейс
- **TypeScript** - типобезопасность и лучший DX

## 🚀 Развертывание

### Production

1. **Backend**: Настройте WSGI сервер (Gunicorn) и веб-сервер (Nginx)
2. **Frontend**: Соберите проект (`npm run build`) и разверните на статическом хостинге
3. **База данных**: Используйте PostgreSQL для production

### Docker (опционально)

Можно добавить Docker контейнеризацию для упрощения развертывания.

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте feature branch
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

## 📞 Поддержка

Если у вас есть вопросы или предложения, создайте Issue в репозитории. 
```
crypto-platform
├─ backend
│  ├─ crypto_api
│  │  ├─ admin.py
│  │  ├─ apps.py
│  │  ├─ migrations
│  │  │  ├─ 0001_initial.py
│  │  │  ├─ __init__.py
│  │  │  └─ __pycache__
│  │  │     ├─ 0001_initial.cpython-313.pyc
│  │  │     └─ __init__.cpython-313.pyc
│  │  ├─ models.py
│  │  ├─ serializers.py
│  │  ├─ urls.py
│  ├─ crypto_platform
│  │  ├─ asgi.py
│  │  ├─ settings.py
│  │  ├─ urls.py
│  │  ├─ wsgi.py
│  │  ├─ __init__.py
│  │  └─ __pycache__
│  │     ├─ settings.cpython-313.pyc
│  │     ├─ urls.cpython-313.pyc
│  │     ├─ wsgi.cpython-313.pyc
│  │     └─ __init__.cpython-313.pyc
│  ├─ db.sqlite3
│  ├─ manage.py
│  └─ requirements.txt
├─ frontend
│  ├─ .next
│  ├─ app
│  │  ├─ auth
│  │  │  └─ page.tsx
│  │  ├─ cryptos
│  │  │  └─ page.tsx
│  │  ├─ favorites
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  ├─ CryptoCard.tsx
│  │  └─ Navbar.tsx
│  ├─ contexts
│  │  └─ AuthContext.tsx
│  ├─ next-env.d.ts
│  ├─ next.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ services
│  │  └─ api.ts
│  ├─ tailwind.config.js
│  ├─ tsconfig.json
│  └─ types
│     └─ css.d.ts
├─ README.md
├─ start-backend.bat
├─ start-frontend.bat
└─ venv
   