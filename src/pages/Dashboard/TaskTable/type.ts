interface DataType {
  key: number;
  id: number;
  title: string;
  startTime: string;
  dueTime: string;
  status: string;
  assignee?: string;
  creator: string;
  follow: boolean;
  children?: DataType[];
  parentId?: number;
}
export type { DataType };
