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
  isCompleted: boolean;    // Maps to bool IsCompleted
  completedAt?: string;    // Maps to DateTime? CompletedAt (ISO 8601 string)
  orderIndex: number;      // Maps to int OrderIndex
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
