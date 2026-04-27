import './OngoingTab.css';
import React, { useState, useEffect } from 'react';
import { WeekTimeline } from './SharedTabs';
import { IconChev, IconCheck } from '../shared/Icons';
import { Task, Step } from '../../types/models';

function OngoingCard({ task, onStart }: { task: Partial<Task>; onStart: (task: Partial<Task>, stepIdx: number) => void }) {
  const [open, setOpen] = useState(task.defaultOpen || false);
  const done = task.steps?.filter(s => s.isCompleted) || [];
  const todo = task.steps?.filter(s => !s.isCompleted) || [];
  const firstUndoneIdx = task.steps?.findIndex(s => !s.isCompleted) ?? -1;
  const pct = Math.round((done.length / (task.steps?.length || 1)) * 100);
  const nextStep = todo[0];

  return (
    <div className={`ong-card ${open ? 'open' : ''}`}>
      <button className="ong-card-head" onClick={() => setOpen(o => !o)}>
        <div className="ong-card-head-main">
          <div className="ong-card-meta">
            <span>{task.timeLabel}</span>
            <span className="ong-card-meta-dot">•</span>
            <span>{done.length} / {task.steps?.length} done</span>
          </div>
          <div className="ong-card-title">{task.title}</div>
          <div className="ong-card-progress" aria-hidden="true">
            <div className="ong-card-progress-bar" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className={`ong-card-chev ${open ? 'open' : ''}`}><IconChev size={18} /></div>
      </button>
      {open && (
        <div className="ong-card-body">
          {done.length > 0 && (
            <div className="ong-section">
              <div className="ong-section-label">Completed <span className="ong-section-count">{done.length}</span></div>
              <ul className="ong-steps">
                {done.map((s, i) => (
                  <li key={i} className="ong-step done">
                    <div className="ong-step-check filled" aria-hidden="true"><IconCheck size={11} /></div>
                    <div className="ong-step-title">{s.title}</div>
                    {s.completedAt && <div className="ong-step-ts">{new Date(s.completedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {todo.length > 0 && (
            <div className="ong-section">
              <div className="ong-section-label">Up next <span className="ong-section-count">{todo.length}</span></div>
              <ul className="ong-steps">
                {todo.map((s, i) => (
                  <li key={i} className={`ong-step ${i === 0 ? 'is-next' : ''}`}>
                    <div className="ong-step-check empty" aria-hidden="true" />
                    <div className="ong-step-title">{s.title}</div>
                    {i === 0 && <div className="ong-step-badge">Next</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="ong-card-actions">
            <button
              className="btn-go-pill ong-start"
              disabled={!nextStep}
              onClick={(e) => { e.stopPropagation(); if (nextStep) onStart(task, firstUndoneIdx); }}
            >
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3l8 5-8 5V3z" fill="currentColor" />
              </svg>
              {nextStep ? 'Start Work' : 'All done'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function OngoingTab({ onStartWork }: { onStartWork: (task: Partial<Task>, startIdx: number) => void }) {
  const [seed, setSeed] = useState<Partial<Task>[]>([]);
  const [activeIso, setActiveIso] = useState('2024-12-26');
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    fetch('/ongoing.json')
      .then(res => res.json())
      .then(data => setSeed(data.tasks))
      .catch(err => console.error('Failed to load ongoing tasks:', err));
  }, []);

  const visible = seed.filter(t => t.isoDate === activeIso);
  const niceDay = new Date(activeIso + 'T00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <>
      <h1 className="page-title"><b>Ongoing</b> <span className="title-light">{niceDay}</span></h1>
      <WeekTimeline
        anchor={new Date(2024, 11, 22)}
        activeIso={activeIso}
        onPick={setActiveIso}
        weekOffset={weekOffset}
        onAdvanceWeek={() => setWeekOffset(w => w + 1)}
        onRewindWeek={() => setWeekOffset(w => w - 1)}
        onReset={() => setWeekOffset(0)}
      />
      <div className="up-toolbar">
        <div className="up-toolbar-label">
          {visible.length} {visible.length === 1 ? 'task' : 'tasks'} in progress
        </div>
      </div>
      <div className="up-list">
        {visible.length === 0 && (
          <div className="up-empty">
            <div className="up-empty-title">Nothing in progress on this day</div>
            <div className="up-empty-sub">Scroll the week to find an active task, or add one from <b>Upcoming</b>.</div>
          </div>
        )}
        {visible.map(t => (
          <OngoingCard
            key={t.id}
            task={t}
            onStart={(task, stepIdx) => onStartWork(task, stepIdx)}
          />
        ))}
      </div>
    </>
  );
}
