import './FinishedTab.css';
import React, { useState } from 'react';
import { IconChev, IconCheck } from '../shared/Icons';

function FinishedCard({ n, title, finishedOn, steps, defaultOpen = false }: any) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`finished-card ${open ? 'open' : ''}`}>
      <button className="finished-card-head" onClick={() => setOpen((o: boolean) => !o)}>
        <div className="finished-card-head-main">
          <div className="finished-card-meta">
            <span>Task {n}</span>
            <span className="finished-card-meta-dot">•</span>
            <span>Finished {finishedOn}</span>
          </div>
          <div className="finished-card-title">{title}</div>
        </div>
        <div className="finished-card-head-right">
          <div className="finished-card-count">{steps.length} steps</div>
          <div className={`finished-card-chev ${open ? 'open' : ''}`}><IconChev size={18} /></div>
        </div>
      </button>
      {open && (
        <div className="finished-log">
          <div className="finished-log-label">Completed sub-steps</div>
          <ul className="finished-steps">
            {steps.map((s: any, i: number) => (
              <li key={i} className="finished-step">
                <div className="finished-step-check" aria-hidden="true">
                  <IconCheck size={11} />
                </div>
                <div className="finished-step-title">{s.title}</div>
                <div className="finished-step-ts">{s.ts}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function FinishedTab() {
  // TODO (Backend): GET /api/tasks?status=finished
  const cards = [
    {
      n: 1,
      title: '9:00 AM — Team Meeting',
      finishedOn: 'Dec 27 at 10:26 AM',
      steps: [
        { title: 'Review agenda & open notes', ts: 'Dec 27, 2024 · 9:02 AM' },
        { title: 'Share onboarding progress', ts: 'Dec 27, 2024 · 9:18 AM' },
        { title: 'Biometric-survey walkthrough', ts: 'Dec 27, 2024 · 9:41 AM' },
        { title: 'Assign follow-ups', ts: 'Dec 27, 2024 · 10:14 AM' },
        { title: 'Write-up & file meeting notes', ts: 'Dec 27, 2024 · 10:26 AM' },
      ],
      defaultOpen: true,
    },
    {
      n: 2,
      title: 'Morning Exercise — low-intensity',
      finishedOn: 'Dec 27 at 8:32 AM',
      steps: [
        { title: 'Dress, water, light stretch', ts: 'Dec 27, 2024 · 8:00 AM' },
        { title: '20-minute easy-pace walk', ts: 'Dec 27, 2024 · 8:22 AM' },
        { title: 'Log energy score (4/5)', ts: 'Dec 27, 2024 · 8:32 AM' },
      ],
    },
  ];

  return (
    <>
      <h1 className="page-title"><b>Finished</b> <span className="title-light">Completed tasks log</span></h1>
      <div className="finished-list">
        {cards.map((c, i) => <FinishedCard key={i} {...c} />)}
      </div>
    </>
  );
}
