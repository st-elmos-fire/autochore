type Dependency = ['none', 'blocked_by', 'dependent_on'];
export interface Chore {
  id: string;
  name: string;
  description: string;
  size: string;
  dependency?: Dependency;
  dependent?: string;
  assignee: number;
  frequency: string;
  run_on: string[];
}
