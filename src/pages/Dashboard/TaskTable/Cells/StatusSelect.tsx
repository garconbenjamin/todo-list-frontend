import { useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

import { useUpdateTask } from "@/api/task";
import { TASK_STATUS } from "@/constant";

import StatusTag from "./StatusTag";
import { DataType } from "../../type";

function StatusSelect(props: { value?: number; record: DataType }) {
  const { value, record } = props;

  const [isEditing, setIsEditing] = useState(false);

  const [updateTask] = useUpdateTask({
    taskId: record.id,
    parentId: record.parentId,
  });

  const handleUpdateStatus = (taskId: number, status: number) => {
    updateTask({
      variables: {
        input: {
          id: taskId,
          status: +status,
        },
      },
    });
    setIsEditing(false);
  };

  return isEditing ? (
    <Select
      onSelect={(status) => handleUpdateStatus(record.id, status)}
      style={{ width: 120 }}
      placeholder="Select a person"
      optionLabelProp="label"
      defaultOpen={true}
      onDropdownVisibleChange={(open) => {
        if (!open) setIsEditing(false);
      }}
      value={value}
      options={Object.entries(TASK_STATUS).map(([value, label]) => ({
        label,
        value,
      }))}
    />
  ) : value ? (
    <StatusTag value={value} onClick={() => setIsEditing(true)} />
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
export default StatusSelect;
