import { axiosClient, useAppAxios } from "../client";
import { Task } from "../types/task";

const getAssignmentByUserId = (userId: number) => {
  return axiosClient.get<Task[]>(`/task/assign/${userId}`);
};

const useAssigmentTasks = ({ userId }: { userId: number }) =>
  useAppAxios<Task[]>(`/task/assign/${userId}`);

export { getAssignmentByUserId, useAssigmentTasks };
