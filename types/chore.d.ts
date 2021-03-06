export interface Chore {
  content: string;
  description: string;
  project_id: number;
  priority: number;
  exceptionType?: string;
  existingChore?: string;
  assignee: number;
  frequency: string;
  run_on: string[];
}
