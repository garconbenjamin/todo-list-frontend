interface DataType {
  key: number;
  id: number;
  title: string;
  startTime: string;
  dueTime: string;
  status: number;
  assignee?: { id?: number; name?: string };
  creator: { id: number; name: string };
  follower?: { id?: number; name?: string };
  children?: DataType[];
  parentId?: number;
  description?: string;
}
export type { DataType };
