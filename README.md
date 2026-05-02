# DopaDrive

**DopaDrive** is a focus-coaching web application designed to help users — especially those with ADHD or focus-related challenges — plan, execute, and reflect on deep-work sessions through AI-assisted task breakdowns, biometric check-ins, and guided rest periods.

---

## ✨ Features

| Feature              | Description                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Coach screen**     | Describe your task and goal; the AI generates a step-by-step roadmap with behavioral cues                          |
| **Roadmap display**  | AI-generated steps with action verbs, decomposition strategy, passion anchors, and priority tier (High/Medium/Low) |
| **Focus timer**      | Full-screen immersive timer for each step with decomposition context, primary action, and deliverable              |
| **InCUP tags**       | Urgency/Passion/Interest tags on steps to enhance motivation and focus                                             |
| **16-second survey** | 4-question biometric check-in (stress, clarity, energy, satisfaction) after each step                              |
| **Rest break**       | Wellness tips from the back office, displayed with a live countdown ring                                           |
| **Recovery screen**  | Personalised wisdom message based on survey answers before continuing                                              |
| **Upcoming tab**     | Week-view calendar to plan and schedule tasks                                                                      |
| **Ongoing tab**      | Tracks in-progress tasks with step-level detail                                                                    |
| **Finished tab**     | Completed task log with expanded step history                                                                      |
| **Hourglass timer**  | Custom animated SVG hourglass that syncs with AI-estimated task durations and transitions color at 75% completion  |
| **HyperFocus mode**  | Bypass mode to skip surveys/rest and stay in the zone, with a 3-second 'hold-to-disable' intentional friction lock |

---

## 🏗️ Tech Stack

| Layer         | Technology                                                   |
| ------------- | ------------------------------------------------------------ |
| Framework     | React 19 + TypeScript                                        |
| Build tool    | Vite 8                                                       |
| Styling       | Vanilla CSS (component-scoped) + Tailwind CSS v3 (utilities) |
| UI primitives | Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-slot`)  |
| Icons         | Lucide React                                                 |
| Networking    | `axios` (centralized API client in `src/lib/api.ts`)         |
| Backend       | .NET Core REST API (async roadmap generation)                |

---

## 📁 Project Structure

```
src/
├── App.tsx                   # Root component — phase/tab state machine
├── index.css                 # Global CSS variables, resets, Tailwind base
├── main.tsx                  # Entry point
│
├── lib/
│   └── utils.ts              # Utility functions
│
├── types/
│   ├── models.ts             # Core TypeScript interfaces
│   └── backend.ts, etc.      # Additional type definitions
│
└── components/
    ├── auth/                 # Authentication views
    │   └── LoginScreen.tsx
    │
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
    │   ├── dialog.tsx
    │   ├── input.tsx
    │   ├── textarea.tsx
    │   └── ui.css
    │
    └── shared/               # Shared icons, decorative elements
        ├── Icons.tsx
        └── shared.css
```

---

## 📊 Data Models

### Step (Frontend)

```ts
interface Step {
  id: string;
  taskId: string;
  title: string;
  stepTitle?: string; // Action-verb title
  decomposition?: string; // 2-3 sentence strategy
  estimatedTime?: number; // Minutes
  isLaunchTask?: boolean;
  primaryVerb?: string; // Core action (e.g., "Identify")
  deliverable?: string; // Tangible output
  noveltyHook?: string; // Engagement mechanism
  passionAnchor?: string; // Identity-link sentence
  urgencyCue?: string; // Time phrase
  incupTags?: string[]; // ["Urgency", "Passion", "Interest"]
  isCompleted: boolean;
  completedAt?: string;
  orderIndex: number;
}
```

### SessionMetadata (Frontend)

```ts
interface SessionMetadata {
  intentPriority: "High" | "Medium" | "Low";
  identifiedTier: "Tier 1" | "Tier 2" | "Tier 3";
  estimatedTotalSessionTime: number; // Minutes
  totalTasks: number;
}
```

### Backend Response Types

```ts
interface BackendRoadmapResponse {
  session_metadata: {
    intent_priority: string;
    identified_tier: string;
    estimated_total_session_time: number;
    total_tasks: number;
  };
  tasks: BackendTask[];
}
```

All models are defined in `src/types/models.ts`.

---

## 🔄 Coach Flow

```
Coach entry → Roadmap → Focus (per step) → Survey gateway
    → 16-second survey → Rest break → Recovery → next step / done
```

Each phase is managed as a `Phase` union type in `App.tsx`:

```ts
type Phase =
  | "entry"
  | "roadmap"
  | "focus"
  | "gateway"
  | "survey"
  | "rest"
  | "recovery";
```

---

## 🔌 Backend Integration

### Roadmap Generation

When a user submits a task goal, the frontend calls:

**Request:**

```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Write blog post",
  "description": "A 2000-word article on focus techniques"
}
```

**Response:**

```json
{
  "session_metadata": {
    "intent_priority": "High|Medium|Low",
    "identified_tier": "Tier 1|Tier 2|Tier 3",
    "estimated_total_session_time": 255,
    "total_tasks": 12
  },
  "tasks": [
    {
      "task_id": "1",
      "step_title": "Action-verb title",
      "decomposition": "2-3 sentences strategy following energy arc rules",
      "estimated_time": 8,
      "is_launch_task": true,
      "primary_verb": "Identify",
      "deliverable": "Specific tangible output",
      "novelty_hook": "constraint-output|timed-challenge|adversarial|etc",
      "passion_anchor": "Identity-link sentence",
      "urgency_cue": "Time phrase inside the text",
      "incup_tags": ["Urgency", "Passion", "Interest"]
    }
  ]
}
```

The frontend converts snake_case → camelCase and populates:

- `SessionMetadata` with priority tier and timing
- `Step[]` with rich behavioral cues (decomposition, passion anchor, novelty hook, tags)

### Data Flow

```
User input (CoachScreen)
    ↓
POST /api/tasks with { title, description }
    ↓
Backend AI generates roadmap with steps + metadata
    ↓
Frontend converts snake_case to camelCase
    ↓
Store in state (task, sessionMetadata)
    ↓
RoadmapScreen displays with priority tag + step details
    ↓
onStart() → FocusScreen on per-step basis
```

### Other Endpoints (via Axios)

All API calls are centralized in [src/lib/api.ts](src/lib/api.ts) using the `axios` library. It automatically handles base URLs and authorization tokens.

| Method | Endpoint                                  | Purpose                                   |
| ------ | ----------------------------------------- | ----------------------------------------- |
| `POST` | `/api/auth/login`                         | User Email/Password login                 |
| `POST` | `/api/auth/signup`                        | Register new user                         |
| `POST` | `/api/oauth/google`                       | Google SSO authentication                 |
| `POST` | `/api/users/setup`                        | User profile setup and preferences        |
| `POST` | `/api/tasks`                              | Create a new task + generate roadmap      |
| `GET`  | `/api/tasks?status=upcoming`              | List upcoming tasks                       |
| `GET`  | `/api/tasks?status=ongoing`               | List ongoing tasks                        |
| `GET`  | `/api/tasks?status=finished`              | List finished tasks                       |
| `POST` | `/api/focus-sessions`                     | Start a focus session                     |
| `PUT`  | `/api/focus-sessions/{id}/end`            | End a focus session                       |
| `PUT`  | `/api/tasks/{id}/steps/{stepId}/complete` | Mark a step complete                      |
| `PUT`  | `/api/tasks/{id}/complete`                | Mark a task fully done                    |
| `POST` | `/api/surveys`                            | Submit biometric survey answers           |
| `GET`  | `/api/rest-tips/current`                  | Fetch the current wellness tip + duration |
| `POST` | `/api/rest-sessions/complete`             | Record a completed rest break             |

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

## 🧪 Testing with Mock Data

For UI testing without a backend API, the app includes mock roadmap data. The app will automatically use mock data in development if:

1. **Environment variable is set** — Create `.env.local`:

   ```
   VITE_USE_MOCK_DATA=true
   ```

2. **Automatic fallback** — If the real API (`/api/tasks`) fails in development, mock data from `public/mock-roadmap.json` is used automatically.

### Mock Data File Structure

The mock data is located in `public/mock-roadmap.json` and contains:

- **Session metadata** — Priority tier (High/Medium/Low), task tier (Tier 1-3), estimated time, total tasks count
- **5 sample tasks** — Each with:
  - Action verb (Identify, Design, Create, Develop, Refine)
  - 2-3 sentence decomposition strategy
  - Deliverable description
  - Novelty hooks (constraint-output, timed-challenge, adversarial)
  - Passion anchors (identity-linked sentences)
  - InCUP tags (Urgency, Passion, Interest)

To customize the mock data, edit `public/mock-roadmap.json` directly. Changes will appear in the roadmap immediately on the next test run.

---

## 🎨 Design System

CSS custom properties are defined in `src/index.css` under `:root`:

| Variable                                       | Purpose             |
| ---------------------------------------------- | ------------------- |
| `--green`, `--green-hover`                     | Brand teal/green    |
| `--ink`, `--ink-2`, `--ink-3`                  | Text hierarchy      |
| `--paper`, `--paper-2`                         | Background surfaces |
| `--hairline`                                   | Subtle borders      |
| `--mint-soft`, `--mint-stripe`, `--mint-panel` | Accent surfaces     |
| `--font-display`, `--font-body`                | Typography scale    |
| `--dur-fast`, `--ease-out`                     | Motion tokens       |

---

## 📝 License

Private — all rights reserved.
