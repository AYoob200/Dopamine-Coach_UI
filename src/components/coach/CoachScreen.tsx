import './CoachScreen.css';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function CoachScreen({ onGo }: { onGo: (data: { title: string; body: string }) => void }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const canGo = title.trim().length > 0;

  return (
    <>
      <h1 className="page-title"><b>Coach</b> <span className="title-light">Plan a focus block</span></h1>
      <div className="coach-grid">
        <div className="coach-card">
          <div className="coach-card-head">
            <div className="coach-card-label">New focus session</div>
            <div className="coach-card-sub">Tell me your main goal — I'll break it into steps.</div>
          </div>
          <div className="coach-field">
            <label className="coach-field-label">Title of the task</label>
            <Input
              placeholder="e.g. Onboarding spec — first draft"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-surface"
            />
          </div>
          <div className="coach-field">
            <label className="coach-field-label">What do you want to achieve?</label>
            <Textarea
              placeholder="One or two sentences. The more specific, the better the roadmap."
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="bg-surface"
            />
          </div>
          <div className="coach-card-foot">
            <div className="coach-foot-hint">
              {canGo ? 'Ready — I\'ll suggest a steps roadmap.' : 'Add a title to continue.'}
            </div>
            <button
              className="btn-go-pill"
              disabled={!canGo}
              onClick={async () => {
                if (canGo) {
                  // NOTE: Creation of the task is handled internally by the handleGo callback in App.tsx
                  // which already calls POST /api/tasks.
                  onGo({ title, body });
                }
              }}
            >
              GO
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
        <aside className="coach-aside">
          <div className="coach-aside-card">
            <div className="coach-aside-label">How this works</div>
            <ol className="coach-steps-list">
              <li><span className="coach-steps-num">1</span>Name your focus</li>
              <li><span className="coach-steps-num">2</span>Review the AI roadmap</li>
              <li><span className="coach-steps-num">3</span>Work one step at a time</li>
              <li><span className="coach-steps-num">4</span>16-second biometric check-in</li>
            </ol>
          </div>
        </aside>
      </div>
    </>
  );
}
