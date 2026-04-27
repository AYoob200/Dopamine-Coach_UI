/**
 * Backend API Response Types
 * These represent the snake_case responses from the .NET backend
 * They map to the camelCase interfaces in other files
 */

export interface BackendSessionMetadata {
  intent_priority: 'High' | 'Medium' | 'Low';
  estimated_total_session_time: number;
  total_tasks: number;
}

export interface BackendTask {
  task_id: string;
  step_title: string;
  decomposition: string;
  estimated_time: number;
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
