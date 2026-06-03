# PROMPT_PLAN.md — План разработки этапа 2

## Общая стратегия

Проект разрабатывался в несколько итераций с использованием AI-ассистента (opencode). Каждый этап включал анализ требований, генерацию кода и проверку.

## Итерация 1: Инициализация и настройка

**Запрос AI:** Настроить Next.js 15 проект с App Router, TypeScript, Tailwind CSS v4, next-intl.

**Результат:**
- Создан Next.js проект
- Настроен Tailwind CSS v4 (через `@tailwindcss/postcss`)
- Настроен next-intl (routing, navigation, request, middleware)
- Созданы файлы переводов en.json / ru.json

## Итерация 2: Архитектура и типы

**Запрос AI:** Создать структуру директорий, типы данных, схему валидации и mock-данные.

**Результат:**
- `src/lib/types.ts` — Booking, BookingStatus
- `src/lib/form-schema.ts` — Zod схема для формы бронирования
- `src/lib/mock-data.ts` — 12 mock-записей бронирований

## Итерация 3: Компоненты UI

**Запрос AI:** Создать Header, Footer, LanguageSwitcher, BookingForm, BookingTable.

**Результат:**
- Header с навигацией и переключателем языка (Server Component)
- Footer с юридической информацией (Server Component)
- LanguageSwitcher с useTransition (Client Component)
- BookingForm с react-hook-form + zod (Client Component)
- BookingTable с фильтрацией и поиском (Client Component)

## Итерация 4: Страницы и роутинг

**Запрос AI:** Создать все страницы проекта с SEO metadata и server components.

**Результат:**
- `/page.tsx` — лендинг с секциями hero, about, services, clients, contacts
- `/services/page.tsx` — страница услуг
- `/booking/page.tsx` — страница с формой
- `/manager/page.tsx` — страница с таблицей
- `/privacy/page.tsx`, `/cookie/page.tsx`, `/terms/page.tsx`, `/transport-terms/page.tsx`
- `not-found.tsx` — 404

## Итерация 5: Переводы и локализация

**Запрос AI:** Заполнить переводы для всех страниц на русском и английском.

**Результат:**
- Полные переводы для всех страниц
- SEO metadata для каждой страницы с учётом локали

## Итерация 6: Анимации и UI/UX

**Запрос AI:** Добавить анимации через motion и улучшить визуал.

**Результат:**
- Анимации появления секций и строк таблицы
- Hover-эффекты на кнопках
- Плавные transitions
