import React, { useEffect } from 'react';
import { Button } from '../ui/button';

export function RecoveryScreen({
  answers,
  onContinue,
  isLast,
}: {
  answers: number[];
  onContinue: () => void;
  isLast: boolean;
}) {
  const avg = answers.reduce((s, n) => s + (n || 3), 0) / Math.max(1, answers.length);
  const wisdom =
    avg <= 2.5
      ? 'Deep breaths. Your cognitive battery is recharging.'
      : avg >= 4
        ? 'Steady momentum. Let the clarity carry you.'
        : "Soft reset. One more gentle step when you're ready.";

  useEffect(() => {
    const t = setTimeout(() => {
      // TODO (Backend): If isLast, mark Task as fully complete: PUT /api/tasks/{id}/complete
      onContinue();
    }, 6000);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <div className="focus-stage">
      <div className="focus-card">
        <h2 className="wisdom">{wisdom}</h2>
        <p className="wisdom-sub">{isLast ? 'Returning to the hub in a moment.' : 'The next step begins in a moment.'}</p>
        <Button variant="outline" className="btn-secondary" onClick={onContinue}>
          {isLast ? 'Return to Coach' : 'Continue now'}
        </Button>
      </div>
    </div>
  );
}
