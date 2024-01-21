import { useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Select, Tag } from "antd";

import { getAllTasksByGroupGQL, updateTaskGQL } from "@/api/task/gql";
import { getUsersByGroupGQL } from "@/api/user/gql";
import { useAppSelector } from "@/redux/hooks";

import { DataType } from "../type";

function AssigneeSelect(props: { value?: string; record: DataType }) {
  const { value, record } = props;
  const user = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const { data: groupUsers } = useQuery(getUsersByGroupGQL, {
    variables: { groupId: user.groupId! },
  });
  const [updateTask] = useMutation(updateTaskGQL, {
    refetchQueries: [
      { query: getAllTasksByGroupGQL, variables: { groupId: user.groupId! } },
    ],
  });

  const handleAssignTask = (taskId: number, userId: number | null) => {
    updateTask({
      variables: {
        input: {
          id: taskId,
          assigneeId: userId,
        },
      },
    });
    setIsEditing(false);
  };
  return isEditing ? (
    <Select
      onBlur={() => setIsEditing(false)}
      onSelect={(userId) => handleAssignTask(record.id, userId)}
      style={{ width: 120 }}
      placeholder="Select a person"
      optionLabelProp="label"
      open
      value={
        groupUsers?.getUsersByGroup.find((user) => user.name === value)?.id
      }
      options={groupUsers?.getUsersByGroup.map((user) => ({
        label: user.name,
        value: +user.id,
      }))}
    />
  ) : value ? (
    <Tag
      style={{ cursor: "pointer" }}
      onClick={() => setIsEditing(true)}
      closable
      onClose={() => handleAssignTask(record.id, null)}
    >
      {value.slice(0, 1).toUpperCase() + value.slice(1)}
    </Tag>
  ) : (
    <Button
      size="small"
      icon={<UserOutlined />}
      onClick={() => setIsEditing(true)}
    >
      Assign
    </Button>
  );
}
export default AssigneeSelect;
