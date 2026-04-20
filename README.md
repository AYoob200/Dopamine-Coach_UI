# DopaDrive

**DopaDrive** is a focus-coaching web application designed to help users — especially those with ADHD or focus-related challenges — plan, execute, and reflect on deep-work sessions through AI-assisted task breakdowns, biometric check-ins, and guided rest periods.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Coach screen** | Describe your task and goal; the AI breaks it into a step-by-step roadmap |
| **Focus timer** | Full-screen immersive timer for each step, with add-time, restart, and end controls |
| **16-second survey** | 4-question biometric check-in (stress, clarity, energy, satisfaction) after each step |
| **Rest break** | Wellness tips from the back office, displayed with a live countdown ring |
| **Recovery screen** | Personalised wisdom message based on survey answers before continuing |
| **Upcoming tab** | Week-view calendar to plan and schedule tasks |
| **Ongoing tab** | Tracks in-progress tasks with step-level detail |
| **Finished tab** | Completed task log with expanded step history |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Vanilla CSS (component-scoped) + Tailwind CSS v3 (utilities) |
| UI primitives | Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-slot`) |
| Icons | Lucide React |
| Backend (planned) | .NET Core REST API |

---

## 📁 Project Structure

```
src/
├── App.tsx                   # Root component — phase/tab state machine
├── index.css                 # Global CSS variables, resets, Tailwind base
├── main.tsx                  # Entry point
│
├── types/
│   └── models.ts             # TypeScript interfaces (Task, Step, FocusSession, SurveyAnswer)
│
└── components/
    ├── layout/               # Shell, Sidebar — app chrome
    │   ├── Shell.tsx
    │   ├── Sidebar.tsx
    │   └── layout.css
    │
    ├── coach/                # Full coach flow (one file per screen)
    │   ├── index.ts          # Barrel re-export
    │   ├── CoachScreen.tsx   # Task entry form
    │   ├── RoadmapScreen.tsx # AI step breakdown
    │   ├── FocusScreen.tsx   # Full-screen focus timer
    │   ├── SurveyScreen.tsx  # 16-second biometric check-in + gateway
    │   ├── RestScreen.tsx    # Wellness tip + countdown rest break
    │   ├── RecoveryScreen.tsx# Post-survey wisdom message
    │   └── *.css             # Co-located component styles
    │
    ├── tabs/                 # Main navigation tabs
    │   ├── SharedTabs.tsx    # WeekTimeline, TaskPopup (shared)
    │   ├── OngoingTab.tsx
    │   ├── UpcomingTab.tsx
    │   ├── FinishedTab.tsx
    │   └── *.css
    │
    ├── ui/                   # Primitive UI components
    │   ├── button.tsx
    │   ├── input.tsx
    │   ├── textarea.tsx
    │   └── ui.css
    │
    └── shared/               # Shared icons, decorative elements
        ├── Icons.tsx
        └── shared.css
```

---

## 🔄 Coach Flow

```
Coach entry → Roadmap → Focus (per step) → Survey gateway
    → 16-second survey → Rest break → Recovery → next step / done
```

Each phase is managed as a `Phase` union type in `App.tsx`:

```ts
type Phase = 'entry' | 'roadmap' | 'focus' | 'gateway' | 'survey' | 'rest' | 'recovery';
```

---

## 🔌 Backend Integration

The frontend is pre-wired with `TODO (Backend)` comments at every API boundary. Key endpoints expected:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks?status=upcoming` | List upcoming tasks |
| `GET` | `/api/tasks?status=ongoing` | List ongoing tasks |
| `GET` | `/api/tasks?status=finished` | List finished tasks |
| `POST` | `/api/focus-sessions` | Start a focus session |
| `PUT` | `/api/focus-sessions/{id}/end` | End a focus session |
| `PUT` | `/api/tasks/{id}/steps/{stepId}/complete` | Mark a step complete |
| `PUT` | `/api/tasks/{id}/complete` | Mark a task fully done |
| `POST` | `/api/surveys` | Submit biometric survey answers |
| `GET` | `/api/rest-tips/current` | Fetch the current wellness tip + duration |
| `POST` | `/api/rest-sessions/complete` | Record a completed rest break |

Data models are defined in `src/types/models.ts` and map directly to the .NET Core C# entity properties.

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & run

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Build for production

```bash
npm run build
```

Output goes to `dist/`.

### Preview production build

```bash
npm run preview
```

---

## 🎨 Design System

CSS custom properties are defined in `src/index.css` under `:root`:

| Variable | Purpose |
|---|---|
| `--green`, `--green-hover` | Brand teal/green |
| `--ink`, `--ink-2`, `--ink-3` | Text hierarchy |
| `--paper`, `--paper-2` | Background surfaces |
| `--hairline` | Subtle borders |
| `--mint-soft`, `--mint-stripe`, `--mint-panel` | Accent surfaces |
| `--font-display`, `--font-body` | Typography scale |
| `--dur-fast`, `--ease-out` | Motion tokens |

---

## 📝 License

Private — all rights reserved.
