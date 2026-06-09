# LONDON ROUTE TRANSFERS

Сайт транспортной компании с лендингом, формой бронирования и страницей менеджера.

## Стек

- **Next.js 15** (App Router)
- **React 19**, **TypeScript**
- **Tailwind CSS v4**
- **next-intl** (мультиязычность EN/RU)
- **react-hook-form** + **zod** (форма и валидация)
- **motion** (анимации)
- **NestJS** (backend, в `backend/`)

## Установка и запуск

### Frontend

```bash
npm install
npm run dev
# Открыть http://localhost:3000
```

### Backend

```bash
cd backend
npm install
npm run start:dev
# Сервер запустится на http://localhost:3001
```

### Одновременный запуск

Откройте два терминала:

```bash
# Терминал 1 — backend
cd backend && npm run start:dev

# Терминал 2 — frontend
npm run dev
```

## Страницы

| Маршрут | Описание | Рендеринг |
|---|---|---|
| `/` | Главная лендинговая страница | Server |
| `/services` | Типы поездок и преимущества | Server |
| `/booking` | Форма бронирования | Server + Client (форма) |
| `/manager` | Таблица бронирований (данные из backend) | Server + Client (таблица) |
| `/privacy` | Политика конфиденциальности | Server |
| `/cookie` | Политика cookies | Server |
| `/terms` | Условия использования | Server |
| `/transport-terms` | Условия транспортных услуг | Server |

## Структура проекта

```
src/
├── app/
│   ├── [locale]/           # Локализованные маршруты
│   │   ├── booking/        # Страница бронирования
│   │   ├── manager/        # Страница менеджера
│   │   ├── services/       # Страница услуг
│   │   ├── privacy/        # Политика конфиденциальности
│   │   ├── cookie/          # Политика cookies
│   │   ├── terms/          # Условия использования
│   │   ├── transport-terms/# Условия транспортных услуг
│   │   ├── layout.tsx      # Корневой layout
│   │   └── page.tsx        # Главная страница
│   ├── globals.css         # Tailwind CSS + кастомные стили
│   └── not-found.tsx       # 404
├── components/
│   ├── Header.tsx          # Шапка с навигацией (Server)
│   ├── Footer.tsx          # Подвал (Server)
│   ├── LanguageSwitcher.tsx# Переключатель языка (Client)
│   ├── BookingForm.tsx     # Форма бронирования (Client)
│   ├── BookingTable.tsx    # Таблица бронирований (Client)
│   └── ...
├── i18n/
│   ├── routing.ts          # Конфиг маршрутизации next-intl
│   ├── navigation.ts       # Навигационные утилиты
│   └── request.ts          # Загрузка переводов
├── lib/
│   ├── types.ts            # Типы данных
│   ├── form-schema.ts      # Zod схема валидации
│   ├── mock-data.ts        # Mock-данные (не используются)
│   └── api.ts              # API client для backend
├── messages/
│   ├── en.json             # Английские переводы
│   └── ru.json             # Русские переводы
└── middleware.ts           # next-intl middleware

backend/
├── src/
│   ├── main.ts             # Точка входа (CORS, ValidationPipe)
│   ├── app.module.ts       # Корневой модуль
│   └── bookings/
│       ├── bookings.module.ts
│       ├── bookings.controller.ts  # REST endpoints
│       ├── bookings.service.ts     # Бизнес-логика
│       ├── dto/
│       │   ├── create-booking.dto.ts
│       │   └── update-booking-status.dto.ts
│       └── interfaces/
│           └── booking.interface.ts
├── package.json
└── tsconfig.json
```
