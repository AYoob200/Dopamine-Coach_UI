/**
 * DopaDrive Data Models
 * 
 * These interfaces map directly to the JSON payloads expected to/from the .NET Core Backend.
 * Properties are defined in camelCase for TypeScript convention, but standard .NET Core JSON serializers 
 * (like System.Text.Json) map camelCase JSON to PascalCase C# properties automatically.
 */

// Export all types from their respective files
export * from './step';
export * from './task';
export * from './session';
export * from './backend';

// Re-export for backward compatibility
export type { Step } from './step';
export type { Task } from './task';
export type { SessionMetadata, SurveyAnswer, FocusSession } from './session';
export type { BackendSessionMetadata, BackendTask, BackendRoadmapResponse } from './backend';
