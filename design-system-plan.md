# Интеграция дизайн-системы «Британский классик»

## Шаг 1 — globals.css
- Заменить `Libre Baskerville` на `Playfair Display` в `@theme`
- Добавить цвета: `--brand-navy: #002147`, `--brand-burgundy: #800020`, `--bg-stone: #E5E4E2`, `--text-main: #333333`
- Убрать лишние `--color-gray-*`
- body: фон `var(--bg-stone)`, цвет `var(--text-main)`, шрифт `Inter, sans-serif`
- Заголовки h1–h6: `Playfair Display`
- `transition-all duration-500 ease-in-out` на интерактивные элементы

## Шаг 2 — layout.tsx
- Google Fonts: заменить `Libre Baskerville` на `Playfair Display` + `Inter`

## Шаг 3 — Hero.tsx (серверный компонент)
- Вынести hero из `page.tsx` в `components/Hero.tsx`
- `interface HeroProps { t: (key: string) => string }`
- `py-20`, `tracking-tight`, `text-4xl md:text-5xl`
- CTA: `bg-[var(--brand-burgundy)] hover:bg-[var(--brand-navy)]`
- `transition-all duration-500 ease-in-out`

## Шаг 4 — QuickBookingForm.tsx (Client Component)
- Поля: destination, date, consent
- react-hook-form + zod
- useTranslations('booking')
- CTA: `bg-[var(--brand-burgundy)] hover:bg-[var(--brand-navy)]`

## Шаг 5 — Интеграция на главную
- page.tsx: `<Hero />` + `<QuickBookingForm />`
- Header/Footer: заменить gold на navy/burgundy
- Удалить `--color-gold` из globals.css
