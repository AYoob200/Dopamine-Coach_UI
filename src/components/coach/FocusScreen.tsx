import './FocusScreen.css';
import React from 'react';
import { Hourglass } from '../shared/Icons';

export function FocusScreen({
  stepTitle,
  onComplete,
  onEnd,
  onRestart,
  onAddTime
}: {
  stepTitle: string;
  onComplete: () => void;
  onEnd: () => void;
  onRestart: () => void;
  onAddTime: () => void;
}) {
  return (
    <div className="focus-stage focus-stage-bare">
      <div className="focus-center">
        <h2 className="focus-step-title">{stepTitle}</h2>
        <Hourglass />
      </div>
      <div className="focus-pad" role="toolbar" aria-label="Focus controls">
        <button className="focus-sq focus-sq-add" onClick={onAddTime} title="Add time" aria-label="Add time">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 1.5" /><path d="M9 3h6" /><path d="M12 3v2" />
          </svg>
        </button>
        <button className="focus-sq focus-sq-restart" onClick={onRestart} title="Restart step" aria-label="Restart step">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 2.64-6.36" /><path d="M3 4v5h5" />
          </svg>
        </button>
        <button className="focus-sq focus-sq-end" onClick={() => {
          // TODO (Backend): PUT /api/focus-sessions/{id}/end 
          onEnd();
        }} title="End session" aria-label="End session">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="none">
            <rect x="6" y="6" width="12" height="12" rx="1.5" />
          </svg>
        </button>
        <button className="focus-sq focus-sq-complete" onClick={() => {
          // TODO (Backend): PUT /api/tasks/{taskId}/steps/{stepId}/complete
          onComplete();
        }} title="Complete step" aria-label="Complete step">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
