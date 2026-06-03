# LONDON ROUTE TRANSFERS

Сайт транспортной компании с лендингом, формой бронирования и страницей менеджера на mock-данных.

## Стек

- **Next.js 15** (App Router)
- **React 19**, **TypeScript**
- **Tailwind CSS v4**
- **next-intl** (мультиязычность EN/RU)
- **react-hook-form** + **zod** (форма и валидация)
- **motion** (анимации)

## Установка и запуск

```bash
npm install
npm run dev
# Открыть http://localhost:3000

npm run build
npm run start

npm run lint
```

## Страницы

| Маршрут | Описание | Рендеринг |
|---|---|---|
| `/` | Главная лендинговая страница | Server |
| `/services` | Типы поездок и преимущества | Server |
| `/booking` | Форма бронирования | Server + Client (форма) |
| `/manager` | Таблица бронирований (mock) | Server + Client (таблица) |
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
│   └── BookingTable.tsx    # Таблица бронирований (Client)
├── i18n/
│   ├── routing.ts          # Конфиг маршрутизации next-intl
│   ├── navigation.ts       # Навигационные утилиты
│   └── request.ts          # Загрузка переводов
├── lib/
│   ├── types.ts            # Типы данных
│   ├── form-schema.ts      # Zod схема валидации
│   └── mock-data.ts        # Mock-данные бронирований
├── messages/
│   ├── en.json             # Английские переводы
│   └── ru.json             # Русские переводы
└── middleware.ts           # next-intl middleware
```
