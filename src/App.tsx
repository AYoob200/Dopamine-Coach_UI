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
import { Task, Step, BackendRoadmapResponse } from './types/models';

type Phase = 'entry' | 'roadmap' | 'focus' | 'rest' | 'gateway' | 'survey' | 'recovery' | 'finished';

export default function App() {
  const [tab, setTab] = useState('coach');
  const [darkMode, setDarkMode] = useState(false);
  const [phase, setPhase] = useState<Phase>('entry');
  const [task, setTask] = useState<Partial<Task> | null>(null);
  const [steps, setSteps] = useState<Partial<Step>[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const [skipInterruption, setSkipInterruption] = useState(false);

  const focusMode =
    tab === 'coach' &&
    (phase === 'focus' || phase === 'rest' || phase === 'gateway' || phase === 'survey' || phase === 'recovery');

  const handleGo = async ({ title, body }: { title: string; body: string }) => {
    try {
      // Try to fetch real API first, fallback to mock data in development
      let backendData: BackendRoadmapResponse;

      const useMockMode = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_DATA !== 'false';

      if (useMockMode) {
        // Load mock data from public folder
        const mockResponse = await fetch('/mock-roadmap.json');
        if (!mockResponse.ok) throw new Error('Mock data not found');
        backendData = await mockResponse.json();
      } else {
        // Call backend API to generate roadmap
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description: body })
        });

        if (!response.ok) {
          // Fallback to mock data if API fails in development
          if (import.meta.env.DEV) {
            console.warn('API failed, using mock data');
            const mockResponse = await fetch('/mock-roadmap.json');
            if (!mockResponse.ok) throw new Error('API failed and mock data unavailable');
            backendData = await mockResponse.json();
          } else {
            throw new Error('Failed to generate roadmap');
          }
        } else {
          backendData = await response.json();
        }
      }

      // Convert snake_case from backend to camelCase for frontend
      const steps: Partial<Step>[] = backendData.tasks.map((task, index) => ({
        id: task.task_id,
        title: task.step_title,
        stepTitle: task.step_title,
        decomposition: task.decomposition,
        estimatedTime: task.estimated_time,
        isLaunchTask: task.is_launch_task,
        primaryVerb: task.primary_verb,
        deliverable: task.deliverable,
        noveltyHook: task.novelty_hook,
        passionAnchor: task.passion_anchor,
        urgencyCue: task.urgency_cue,
        incupTags: task.incup_tags,
        isCompleted: false,
        orderIndex: index
      }));

      // Build sessionMetadata from snake_case
      const sessionMetadata = {
        intentPriority: backendData.session_metadata.intent_priority,
        identifiedTier: backendData.session_metadata.identified_tier,
        estimatedTotalSessionTime: backendData.session_metadata.estimated_total_session_time,
        totalTasks: backendData.session_metadata.total_tasks
      };

      // Set task with steps and metadata
      setTask({
        title,
        description: body,
        steps: steps as Step[],
        sessionMetadata
      });
      setPhase('roadmap');
    } catch (error) {
      console.error('Error generating roadmap:', error);
      // Fallback to empty state or show error UI
    }
  };

  const handleStart = (r: Partial<Step>[]) => {
    setSteps(r);
    setStepIdx(0);
    setPhase('focus');
  };

  // Step complete → skip gateway if hyperfocus was used, otherwise go to survey
  const completeStep = () => {
    if (skipInterruption) {
      setSkipInterruption(false);
      if (stepIdx + 1 >= steps.length) {
        setPhase('entry');
        setTask(null);
        setStepIdx(0);
      } else {
        setStepIdx(prev => prev + 1);
        setPhase('focus');
      }
    } else {
      setPhase('gateway');
    }
  };
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

  const handleHyperFocus = () => {
  setSkipInterruption(true);
  };



  return (
    <Shell tab={tab} onTab={setTab} focusMode={focusMode} darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)}>
      {tab === 'coach' && phase === 'entry' && <CoachScreen onGo={handleGo} />}
      {tab === 'coach' && phase === 'roadmap' && <RoadmapScreen task={task || {}} onStart={handleStart} />}
      {tab === 'coach' && phase === 'focus' && steps.length > 0 && (
        <FocusScreen
          stepTitle={steps[stepIdx]?.title || 'Focus'}
          step={steps[stepIdx]}
          onHyperFocus={handleHyperFocus}
          isHyperFocusActive={skipInterruption}
          onHyperFocusDeactivate={() => setSkipInterruption(false)}
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
