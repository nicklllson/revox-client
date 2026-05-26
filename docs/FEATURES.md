# Revox Client — Features & Technologies

## Overview

Revox AI — платформа для автоматического перевода и дублирования YouTube-видео. Пользователь вставляет ссылку, выбирает язык и параметры, после чего видео переводится и озвучивается на сервере; результат стримится обратно через WebSocket и воспроизводится в браузере.

---

## Features

### Authentication
- Email + password вход / регистрация
- OAuth через Google (`/auth/google/callback`)
- Сброс пароля по email (OTP-код → новый пароль)
- JWT-сессия в localStorage с авто-рефрешем перед каждым запросом
- Защищённые маршруты с `ProtectedRoute` + `protectedLoader`

### Translation Pipeline
- Ввод YouTube-ссылки и выбор целевого языка
- Выбор модели перевода (Revox Lite / Pro / Ultra)
- Настройка параметров перевода через UI-пилюли:
  - **Voice** — выбор голоса (Pro / Ultra)
  - **Voice type** — тип голоса (Pro / Ultra)
  - **Multitalk** — многоголосый режим (Pro / Ultra)
- Параметры, недоступные на текущем тире, отображаются как заблокированные (`locked-param`)
- WebSocket-стриминг аудио чанками по 30 секунд с prefetch 3 чанков вперёд

### Media Player
- Синхронизированное воспроизведение YouTube-видео + переведённого аудио
- Seek с пересчётом аудио-чанка под позицию
- Управление громкостью (отдельный глобальный контекст)
- Субтитры, синхронизированные через `chunkMeta`-очередь
- Отображение прогресса перевода в реальном времени

### Translation Models

| Модель | Тир | Переводчик | TTS | Whisper | Макс. длина |
|---|---|---|---|---|---|
| Revox Lite | FREE | Google | Edge TTS | base | 30 мин |
| Revox Pro | PRO | Google | Silero | small | 60 мин |
| Revox Ultra | PREMIUM | Google | Silero | medium | 2 часа |

### Subscriptions & Billing
- Три тира: **Free**, **Pro**, **Premium**
- Кредитная система (`creditsUsed` / `creditsRemaining` / `creditsPerMonth`)
- Создание платежа → редирект на YooKassa
- Страница статуса платежа с polling (`usePaymentStatus`)
- Страница истории подписки с событиями (CREATED, UPGRADED, RENEWED и др.)
- Виджет текущего плана + модалка апгрейда
- Отмена с сохранением подписки до конца периода (`cancelAtPeriodEnd`)

### Video Library
- Список переведённых видео с поиском и инфиниt-scroll
- Избранное — добавление / удаление, отдельная страница
- Плейлисты — создание, просмотр, добавление видео через модалку
- Страница видео (`/video/:id`) с полным плеером

### Search
- `cmdk`-based поиск по видео, запускаемый хоткеем

### Settings
- Модалка настроек с вкладками
- Смена темы (light / dark)

### Onboarding
- Пошаговый тур по интерфейсу (`nextstepjs`)
- Провайдер онбординга с кастомной стилизацией

### Mobile
- Плейсхолдер для экранов < 1025px — платформа desktop-only

---

## Technology Stack

### Core
| Слой | Технология |
|---|---|
| Framework | React 19 |
| Build | Vite 7 |
| Language | TypeScript 5.9 |
| Routing | React Router v7 (lazy pages) |

### State & Data
| Слой | Технология |
|---|---|
| Server state | TanStack React Query v5 |
| Global UI state | `create-gstore` + React Context |
| Forms | React Hook Form v7 + Zod v4 |
| JWT | `jwt-decode` |

### UI
| Слой | Технология |
|---|---|
| Styling | Tailwind CSS v4 |
| UI primitives | Radix UI |
| Command palette | `cmdk` |
| OTP input | `input-otp` |
| Toasts | Sonner |
| Icons | Lucide React |
| Date picker | `react-day-picker` + `date-fns` |
| Onboarding | `nextstepjs` |

### Animation & 3D
| Слой | Технология |
|---|---|
| 3D (landing) | Three.js + `@react-three/fiber` + `@react-three/drei` |
| WebGL (landing) | OGL |
| Animations | GSAP + Motion (Framer Motion) |

### Tooling
| Слой | Технология |
|---|---|
| Linter / Formatter | Biome |
| Compiler plugin | `babel-plugin-react-compiler` |
| Git hooks | Husky + lint-staged |
| YouTube embed | `react-youtube` |

### Architecture
- **Feature-Sliced Design (FSD)** — `app / entities / features / pages / shared / widgets`
- `publicApi()` / `privateApi()` — слой работы с HTTP, прокси на `localhost:4200/api`
- WebSocket: `ws://localhost:4200` (env: `VITE_PUBLIC_SERVER_WS`)
- Vendor code-splitting по чанкам: react, router, query, three, animation, ui, forms, utils
