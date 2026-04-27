# 🧠 Dopamine Coach (DopaDrive)

**Dopamine Coach** is a specialized productivity application designed specifically for individuals with ADHD and those struggling with social media distractions. It uses an AI-driven "Energy Arc" strategy to help users break down complex tasks into manageable, high-engagement steps.

## ✨ Key Features

- **🎯 AI Roadmap Generation**: Automatically decomposes high-level goals into 5-25 minute actionable steps using identity-linked "Passion Anchors" and "Novelty Hooks".
- **⏳ Dynamic Hourglass Timer**: A custom-built, animated SVG hourglass that syncs with AI-estimated task durations. Features real-time sand filling and color transitions (Teal to Red) as time runs out.
- **🔥 HyperFocus Mode**: A bypass mode for when you're "in the zone," allowing you to skip surveys and rest screens to maintain momentum.
- **🛡️ Intentional Friction**: Deactivating HyperFocus requires a 3-second hold to prevent impulsive context switching.
- **📊 Progress Tracking**: Organize tasks into "Ongoing", "Upcoming", and "Finished" categories.
- **🌓 Dark/Light Mode**: Fully responsive UI with sleek dark mode support.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Language**: TypeScript
- **Styling**: CSS3 (Vanilla)
- **Icons & Animations**: Custom SVG & Framer Motion
- **State Management**: React Hooks (useState, useRef, useEffect)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AYoob200/Dopamine-Coach_UI.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/components/coach`: Core focus and roadmap screens.
- `src/components/shared`: Reusable icons and the complex Hourglass component.
- `src/components/tabs`: Main dashboard navigation tabs.
- `src/types`: TypeScript models for Tasks, Steps, and API responses.

---
*Created with ❤️ to help focused minds do their best work.*
