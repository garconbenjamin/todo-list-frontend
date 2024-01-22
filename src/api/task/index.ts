import { MutationHookOptions, useMutation } from "@apollo/client";

import { useAppSelector } from "@/redux/hooks";

import { getAllTasksByGroupGQL, updateTaskGQL } from "./gql";
import { axiosClient, useAppAxios } from "../client";
import { Task } from "../types/task";

const getAssignmentByUserId = (userId: number) => {
  return axiosClient.get<Task[]>(`/task/assign/${userId}`);
};

const useAssigmentTasks = ({ userId }: { userId: number }) =>
  useAppAxios<Task[]>(`/task/assign/${userId}`);

const useUpdateTask = (options?: MutationHookOptions) => {
  const user = useAppSelector((state) => state.user);

  const mutation = useMutation(updateTaskGQL, {
    context: {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    },
    refetchQueries: [
      "getTaskLogs",
      { query: getAllTasksByGroupGQL, variables: { groupId: user.groupId! } },
    ],
    onCompleted: options?.onCompleted,
    onError: options?.onError,
  });
  return mutation;
};

export { getAssignmentByUserId, useAssigmentTasks, useUpdateTask };
