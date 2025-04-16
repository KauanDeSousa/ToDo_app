export interface Task {
    id: string;
    title: string;
    completed: boolean;
    description?: string;
    date?: string;
    list?: string;
    subtasks?: number;
}
