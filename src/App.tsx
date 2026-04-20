import React, { useState } from 'react';
import { Shell } from './components/layout/Shell';
import {
  CoachScreen,
  RoadmapScreen,
  FocusScreen,
  RestScreen,
  SurveyGateway,
  SurveyScreen,
  RecoveryScreen,
} from './components/coach';
import { OngoingTab } from './components/tabs/OngoingTab';
import { UpcomingTab } from './components/tabs/UpcomingTab';
import { FinishedTab } from './components/tabs/FinishedTab';
import { Task, Step } from './types/models';

type Phase = 'entry' | 'roadmap' | 'focus' | 'rest' | 'gateway' | 'survey' | 'recovery';

export default function App() {
  const [tab, setTab] = useState('coach');
  const [darkMode, setDarkMode] = useState(false);
  const [phase, setPhase] = useState<Phase>('entry');
  const [task, setTask] = useState<Partial<Task> | null>(null);
  const [steps, setSteps] = useState<Partial<Step>[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const focusMode =
    tab === 'coach' &&
    (phase === 'focus' || phase === 'rest' || phase === 'gateway' || phase === 'survey' || phase === 'recovery');

  const handleGo = ({ title, body }: { title: string; body: string }) => {
    // Mock default steps from the backend for the roadmap
    const defaultSteps: Partial<Step>[] = [
      { title: 'Clarify the outcome in one sentence' },
      { title: 'Sketch the shape of the first draft' },
      { title: 'Write the opening section' },
      { title: 'Review and refine' },
      { title: 'Share for feedback' },
    ];
    setTask({ title, description: body, steps: defaultSteps as Step[] });
    setPhase('roadmap');
  };

  const handleStart = (r: Partial<Step>[]) => {
    setSteps(r);
    setStepIdx(0);
    setPhase('focus');
  };

  // Step complete → survey gateway first
  const completeStep = () => setPhase('gateway');
  const restDone = () => setPhase('recovery');
  const startSurvey = () => {
    setAnswers([]);
    setPhase('survey');
  };
  const surveyDone = (a: number[]) => {
    setAnswers(a);
    setPhase('rest');
  };
  const afterRecovery = () => {
    if (stepIdx + 1 >= steps.length) {
      setPhase('entry');
      setTask(null);
      setStepIdx(0);
    } else {
      setStepIdx(stepIdx + 1);
      setPhase('focus');
    }
  };
  const endSession = () => {
    setPhase('entry');
    setTask(null);
    setStepIdx(0);
  };

  return (
    <Shell tab={tab} onTab={setTab} focusMode={focusMode} darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)}>
      {tab === 'coach' && phase === 'entry' && <CoachScreen onGo={handleGo} />}
      {tab === 'coach' && phase === 'roadmap' && <RoadmapScreen task={task || {}} onStart={handleStart} />}
      {tab === 'coach' && phase === 'focus' && steps.length > 0 && (
        <FocusScreen
          stepTitle={steps[stepIdx]?.title || 'Focus'}
          onComplete={completeStep}
          onEnd={endSession}
          onRestart={() => setPhase('focus')}
          onAddTime={() => {}}
        />
      )}
      {tab === 'coach' && phase === 'gateway' && <SurveyGateway onStart={startSurvey} />}
      {tab === 'coach' && phase === 'survey' && <SurveyScreen onDone={surveyDone} />}
      {tab === 'coach' && phase === 'rest' && <RestScreen onDone={restDone} />}
      {tab === 'coach' && phase === 'recovery' && (
        <RecoveryScreen
          answers={answers}
          onContinue={afterRecovery}
          isLast={stepIdx + 1 >= steps.length}
        />
      )}

      {tab === 'ongoing' && (
        <OngoingTab
          onStartWork={(t, startIdx) => {
            setTab('coach');
            setTask({ title: t.title, description: t.description });
            setSteps(t.steps || []);
            setStepIdx(Math.max(0, startIdx));
            setPhase('focus');
          }}
        />
      )}
      {tab === 'upcoming' && (
        <UpcomingTab
          onLaunchTask={(t) => {
            setTab('coach');
            handleGo({ title: t.title || '', body: t.description || '' });
          }}
        />
      )}
      {tab === 'finished' && <FinishedTab />}
    </Shell>
  );
}
