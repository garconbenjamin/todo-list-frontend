import { useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { Button, Select, Tag } from "antd";

import { useUpdateTask } from "@/api/task";
import { useGroupUsers } from "@/api/user";

import { DataType } from "../../type";

function AssigneeSelect(props: {
  value: { id: number; name: string };
  fieldName: string;
  record: DataType;
}) {
  const { value, record, fieldName } = props;
  const { id, name } = value;
  const [isEditing, setIsEditing] = useState(false);
  const { data: groupUsers } = useGroupUsers();
  const [updateTask] = useUpdateTask();

  const handleAssignTask = (taskId: number, userId: number | null) => {
    updateTask({
      variables: {
        input: {
          id: taskId,
          [fieldName]: userId,
        },
      },
    });
    setIsEditing(false);
  };
  return isEditing ? (
    <Select
      onBlur={() => setIsEditing(false)}
      onDropdownVisibleChange={(open) => {
        if (!open) setIsEditing(false);
      }}
      onSelect={(userId) => handleAssignTask(record.id, userId)}
      style={{ width: 120 }}
      placeholder="Select a person"
      optionLabelProp="label"
      open
      value={id}
      options={groupUsers?.getUsersByGroup.map((user) => ({
        label: user.name,
        value: +user.id,
      }))}
    />
  ) : name ? (
    <Tag
      style={{ cursor: "pointer" }}
      onClick={() => setIsEditing(true)}
      closable
      onClose={() => handleAssignTask(record.id, null)}
    >
      {name.slice(0, 1).toUpperCase() + name.slice(1)}
    </Tag>
  ) : (
    <Button
      size="small"
      icon={<UserOutlined />}
      onClick={() => setIsEditing(true)}
    >
      +
    </Button>
  );
}
export default AssigneeSelect;
