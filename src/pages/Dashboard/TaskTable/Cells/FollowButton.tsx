import { PushpinOutlined, PushpinFilled } from "@ant-design/icons";
import { useMutation } from "@apollo/client";

import {
  followTaskGQL,
  getAllTasksByGroupGQL,
  unflollowTaskGQL,
} from "@/api/task/gql";
import { useAppSelector } from "@/redux/hooks";

import { DataType } from "../type";

function FollowButton(props: {
  value: boolean;
  record: DataType;
  hoveredRow: number | null;
}) {
  const { value, record, hoveredRow } = props;
  const user = useAppSelector((state) => state.user);
  const [followTask] = useMutation(followTaskGQL, {
    refetchQueries: [
      { query: getAllTasksByGroupGQL, variables: { groupId: user.groupId! } },
    ],
  });
  const [unFollowTask] = useMutation(unflollowTaskGQL, {
    refetchQueries: [
      { query: getAllTasksByGroupGQL, variables: { groupId: user.groupId! } },
    ],
  });
  const hovering = hoveredRow === record.id;
  const handleFollowTask = (taskId: number) => {
    followTask({
      variables: {
        input: {
          userId: user.id!,
          taskId: taskId,
        },
      },
    });
  };
  const handleUnfollowTask = (taskId: number) => {
    unFollowTask({
      variables: {
        input: {
          userId: user.id!,
          taskId: taskId,
        },
      },
    });
  };
  return value ? (
    <PushpinFilled onClick={() => handleUnfollowTask(record.id)} />
  ) : hovering ? (
    <PushpinOutlined onClick={() => handleFollowTask(record.id)} />
  ) : (
    <></>
  );
}

export default FollowButton;
