/**
 * DopaDrive Data Models
 * 
 * These interfaces map directly to the JSON payloads expected to/from the .NET Core Backend.
 * Properties are defined in camelCase for TypeScript convention, but standard .NET Core JSON serializers 
 * (like System.Text.Json) map camelCase JSON to PascalCase C# properties automatically.
 */

export interface Step {
  id: string;              // Maps to Guid Id
  taskId: string;          // Maps to Guid TaskId
  title: string;           // Maps to string Title
  stepTitle?: string;      // Action-verb title for the step
  decomposition?: string;  // 2-3 sentences strategy following energy arc rules
  estimatedTime?: number;  // Estimated time in minutes (5-25 range)
  isLaunchTask?: boolean;  // Whether this is a launch task
  primaryVerb?: string;    // Primary action verb (e.g., "Identify")
  deliverable?: string;    // Specific tangible output
  noveltyHook?: string;    // Type of novelty hook (constraint-output, timed-challenge, etc.)
  passionAnchor?: string;  // The identity-link sentence
  urgencyCue?: string;     // The time phrase inside the text
  incupTags?: string[];    // Tags like "Urgency", "Passion", "Interest"
  isCompleted: boolean;    // Maps to bool IsCompleted
  completedAt?: string;    // Maps to DateTime? CompletedAt (ISO 8601 string)
  orderIndex: number;      // Maps to int OrderIndex
}

export interface SessionMetadata {
  intentPriority: 'High' | 'Medium' | 'Low';  // Priority tier
  identifiedTier: 'Tier 1' | 'Tier 2' | 'Tier 3';  // Task tier
  estimatedTotalSessionTime: number;  // Total estimated session time in minutes
  totalTasks: number;  // Total number of tasks
}

export interface Task {
  id: string;              // Maps to Guid Id
  title: string;           // Maps to string Title
  description: string;     // Maps to string Description
  isoDate: string;         // Maps to DateTime IsoDate (Date only "YYYY-MM-DD")
  timeLabel: string;       // Maps to string TimeLabel
  dateLabel?: string;      // Optional display string
  isCompleted: boolean;    // Maps to bool IsCompleted
  steps: Step[];           // Navigation property: ICollection<Step> Steps
  defaultOpen?: boolean;   // UI only state flag, could map to a UserPreference
  sessionMetadata?: SessionMetadata;  // Session metadata with priority and timing info
}

export interface SurveyAnswer {
  questionId: string;      // Maps to Guid QuestionId
  score: number;           // Maps to int Score (1-5)
}

export interface FocusSession {
  id: string;              // Maps to Guid Id
  taskId: string;          // Maps to Guid TaskId
  startedAt: string;       // Maps to DateTime StartedAt
  endedAt?: string;        // Maps to DateTime? EndedAt
  surveyAnswers: SurveyAnswer[]; // ICollection<SurveyAnswer>
}

// Backend API Response Types (snake_case from .NET backend)
export interface BackendSessionMetadata {
  intent_priority: 'High' | 'Medium' | 'Low';
  identified_tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  estimated_total_session_time: number;
  total_tasks: number;
}

export interface BackendTask {
  task_id: string;
  step_title: string;
  decomposition: string;
  estimated_time: number;
  is_launch_task: boolean;
  primary_verb: string;
  deliverable: string;
  novelty_hook: string;
  passion_anchor: string;
  urgency_cue: string;
  incup_tags: string[];
}

export interface BackendRoadmapResponse {
  session_metadata: BackendSessionMetadata;
  tasks: BackendTask[];
}
