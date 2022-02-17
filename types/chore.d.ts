export interface Chore {
    content: string,
    description: string,
    project_id: number,
    priority: number,
    except?: string,
    assignee: number,
    frequency: string,
    run_on: string[]
  }