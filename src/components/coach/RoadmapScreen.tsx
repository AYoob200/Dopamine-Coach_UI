import './RoadmapScreen.css';
import React from 'react';
import { Task, Step } from '../../types/models';
import { Button } from '../ui/button';

export function RoadmapScreen({ task, onStart }: { task: Partial<Task>; onStart: (steps: Partial<Step>[]) => void }) {
  const steps = task.steps || [
    { title: 'Clarify the outcome in one sentence' },
    { title: 'Sketch the shape of the first draft' },
    { title: 'Write the opening section' },
    { title: 'Review and refine' },
    { title: 'Share for feedback' },
  ];

  return (
    <div className="panel">
      <h2 className="page-title" style={{ textAlign: 'center', marginBottom: 8 }}>Your Roadmap</h2>
      <p className="screen-subtitle" style={{ marginBottom: 36 }}>
        {task.title || 'Your focus'} — {steps.length} steps, one at a time.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
        {steps.map((s, i) => (
          <div key={i} className={`step-card ${i === 0 ? 'active' : ''}`}>
            <div className="step-card-num">{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div className="step-card-sub">Step {i + 1} of {steps.length}</div>
              <div className="step-card-title">{s.title}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button className="btn-lg" onClick={() => {
          // TODO (Backend): POST /api/focus-sessions to initialize a tracking session
          onStart(steps);
        }}>Start work</Button>
      </div>
    </div>
  );
}
