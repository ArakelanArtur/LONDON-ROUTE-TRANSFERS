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

**Промпты:**
- "Создай Next.js 15 проект с App Router, TypeScript и Tailwind CSS v4"
- "Добавь next-intl для мультиязычности (EN/RU) с locale prefix 'always'"

## Итерация 2: Архитектура и типы

**Запрос AI:** Создать структуру директорий, типы данных, схему валидации и mock-данные.

**Результат:**
- `src/lib/types.ts` — Booking, BookingStatus, BookingFormData
- `src/lib/form-schema.ts` — Zod схема для формы бронирования
- `src/lib/mock-data.ts` — 12 mock-записей бронирований

**Промпт:**
- "Создай типы для booking формы и mock-данных: Booking, BookingStatus, BookingFormData"

## Итерация 3: Компоненты UI

**Запрос AI:** Создать Header, Footer, LanguageSwitcher, BookingForm, BookingTable.

**Результат:**
- Header с навигацией и переключателем языка
- Footer с юридической информацией
- LanguageSwitcher с useTransition
- BookingForm с react-hook-form + zod
- BookingTable с фильтрацией и поиском

**Ключевые промпты по форме:**
- "Создай форму бронирования с react-hook-form и zod валидацией"
- "Добавь success state и isSubmitting состояние"
- "Переведи ошибки валидации через next-intl"

## Итерация 4: Страницы и роутинг

**Запрос AI:** Создать все страницы проекта с SEO metadata и server components.

**Результат:**
- `/page.tsx` — лендинг с секциями hero, about, services, clients, contacts
- `/booking/page.tsx` — страница с формой
- `/manager/page.tsx` — страница с таблицей
- `/privacy/page.tsx`, `/cookie/page.tsx`, `/terms/page.tsx`, `/transport-terms/page.tsx`
- `not-found.tsx` — 404

**Промпт:**
- "Создай лендинговую страницу с секциями: hero, about, services, clients, contacts"

## Итерация 5: Переводы и локализация

**Запрос AI:** Заполнить переводы для всех страниц на русском и английском.

**Результат:**
- Полные переводы для: common, home, booking, manager, privacy, cookie, terms, transportTerms
- SEO metadata для каждой страницы с учётом локали

## Итерация 6: Анимации и UI/UX

**Запрос AI:** Добавить анимации через motion и улучшить визуал.

**Результат:**
- Анимации появления секций и строк таблицы
- Hover-эффекты на кнопках
- Плавные transitions

## Итерация 7: Статическая HTML-версия (дополнительно)

**Запрос AI:** Создать статическую HTML-версию лендинга с переключателем языка.

**Результат:**
- Index.html (русская версия)
- index-en.html (английская версия)
- style.css с полной стилизацией
- script.js с валидацией формы
- booking.html, manager.html, privacy.html, cookie.html, terms.html
