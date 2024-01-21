interface Task {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  groupId: number;
  srartTime: string;
  dueTime: string;
  createdAt: string;
  updatedAt: string;
  creator?: {
    name: string;
  };
}

type CreateTask = Omit<Task, "id" | "createdAt" | "updatedAt">;
export type { Task, CreateTask };
