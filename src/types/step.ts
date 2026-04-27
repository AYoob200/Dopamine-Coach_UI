/**
 * Step Interface
 * Represents individual steps within a Task
 */

export interface Step {
  id: string;              // Maps to Guid Id
  taskId: string;          // Maps to Guid TaskId
  title: string;           // Maps to string Title
  stepTitle?: string;      // Action-verb title for the step
  decomposition?: string;  // 2-3 sentences strategy following energy arc rules
  estimatedTime?: number;  // Estimated time in minutes (5-25 range)
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
