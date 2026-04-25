/**
 * Session Metadata and Focus Session Interfaces
 */

export interface SessionMetadata {
  intentPriority: 'High' | 'Medium' | 'Low';  // Priority tier
  estimatedTotalSessionTime: number;  // Total estimated session time in minutes
  totalTasks: number;  // Total number of tasks
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
