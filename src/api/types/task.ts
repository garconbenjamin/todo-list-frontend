import { User } from "./user";

interface Task {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  creator: User;
  groupId: number;
  startTime: string;
  dueTime: string;
  createdAt: string;
  updatedAt: string;
}

type CreateTask = Omit<Task, "id" | "creator" | "createdAt" | "updatedAt">;
export type { Task, CreateTask };
