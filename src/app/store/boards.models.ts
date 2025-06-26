export interface Task {
  id: number;
  title: string;
  description: string;
}

export interface List {
  id: number;
  title: string;
  tasks: Task[];
}

export interface Board {
  id: number;
  title: string;
  lists: List[];
}