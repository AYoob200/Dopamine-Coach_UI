import './RestScreen.css';
import React, { useState, useEffect, useRef } from 'react';

export interface RestTip {
  /** Short wellness tip shown as the headline */
  tip: string;
  /** Source / attribution shown below the tip (optional) */
  source?: string;
  /** Rest duration in seconds — comes from the back office */
  durationSeconds: number;
}

// ---------------------------------------------------------------------------
// TODO (Backend): GET /api/rest-tips/current
// Replace this mock with a real fetch when the API is available.
// The endpoint should return a RestTip object with the current tip + duration.
// ---------------------------------------------------------------------------
const FALLBACK_TIPS: RestTip[] = [
  { tip: 'Close your eyes and take three slow, deep breaths.', source: 'Breathing technique', durationSeconds: 60 },
  { tip: 'Stand up, stretch your arms above your head, and roll your shoulders.', source: 'Movement break', durationSeconds: 90 },
  { tip: 'Look at something at least 6 metres away for 20 seconds to relax your eyes.', source: '20-20-20 rule', durationSeconds: 60 },
  { tip: 'Drink a glass of water and let your mind go blank for a moment.', source: 'Hydration tip', durationSeconds: 60 },
  { tip: 'Tense every muscle in your body for 5 seconds, then fully release.', source: 'Progressive relaxation', durationSeconds: 90 },
];

function pickTip(): RestTip {
  // TODO (Backend): replace with await fetch('/api/rest-tips/current')
  return FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)];
}

// Countdown ring constants
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function RestScreen({ onDone }: { onDone: () => void }) {
  const [restTip] = useState<RestTip>(() => pickTip());
  const [secondsLeft, setSecondsLeft] = useState(restTip.durationSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current!);
          // TODO (Backend): POST /api/rest-sessions/complete when rest is done
          onDone();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [onDone]);

  const progress = secondsLeft / restTip.durationSeconds; // 1 → 0
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeLabel = mins > 0
    ? `${mins}:${String(secs).padStart(2, '0')}`
    : `${secs}`;

  return (
    <div className="rest-stage">
      <div className="rest-card">
        {/* Pulsing leaf icon */}
        <div className="rest-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 28C16 28 6 22 6 13a10 10 0 0 1 20 0c0 9-10 15-10 15z" fill="rgba(255,255,255,0.25)" />
            <line x1="16" y1="28" x2="16" y2="14" />
          </svg>
        </div>

        {/* Countdown ring */}
        <div className="rest-timer-wrap" aria-label={`${timeLabel} remaining`}>
          <svg className="rest-timer-svg" viewBox="0 0 100 100">
            <circle className="rest-timer-track" cx="50" cy="50" r={RADIUS} />
            <circle
              className="rest-timer-fill"
              cx="50"
              cy="50"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="rest-timer-label">{timeLabel}</div>
        </div>

        {/* Tip */}
        <div className="rest-label">Rest tip</div>
        <p className="rest-tip">{restTip.tip}</p>
        {restTip.source && (
          <p className="rest-source">{restTip.source}</p>
        )}

        {/* Skip */}
        <button
          className="rest-skip"
          onClick={() => {
            clearInterval(intervalRef.current!);
            onDone();
          }}
          aria-label="Skip rest and continue"
        >
          Skip rest →
        </button>
      </div>
    </div>
  );
}
