import { MutationHookOptions, useMutation } from "@apollo/client";

import { useAppSelector } from "@/redux/hooks";

import { getAllTasksByGroupGQL, getTaskLogsGQL, updateTaskGQL } from "./gql";

const useUpdateTask = ({
  options,
  taskId,
  parentId,
}: {
  options?: MutationHookOptions;
  taskId?: number;
  parentId?: number;
}) => {
  const user = useAppSelector((state) => state.user);
  const createLogRefetchQuery = (taskId?: number) =>
    taskId
      ? [
          {
            query: getTaskLogsGQL,
            variables: { taskId },
          },
        ]
      : [];

  const mutation = useMutation(updateTaskGQL, {
    context: {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    },
    refetchQueries: [
      { query: getAllTasksByGroupGQL, variables: { groupId: user.groupId! } },
      ...createLogRefetchQuery(taskId),
      ...createLogRefetchQuery(parentId),
    ],
    onCompleted: options?.onCompleted,
    onError: options?.onError,
  });
  return mutation;
};

export { useUpdateTask };
