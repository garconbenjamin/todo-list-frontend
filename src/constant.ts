export const TASK_STATUS: Record<number, string> = {
  [-1]: "Archived",
  1: "Created",
  2: "In Progress",
  3: "Completed",
};
export const STATUS_COLOR: Record<number, string> = {
  [-1]: "gray",
  1: "orange",
  2: "blue",
  3: "green",
};

export const STATUS_MAP: Record<string, number> = {
  ARCHIVED: -1,
  CREATED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
};
