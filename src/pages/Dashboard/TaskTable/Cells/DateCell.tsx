import { useState } from "react";

import { CalendarOutlined } from "@ant-design/icons";
import { Button, Tag, DatePicker } from "antd";
import dayjs from "dayjs";

import { useUpdateTask } from "@/api/task";

function DateCell(props: { value: string; taskId: number; name: string }) {
  const { value, taskId, name } = props;
  const [editing, setEditing] = useState(false);

  const [updateTask] = useUpdateTask({ taskId });
  const handleUpdateTask = (date: string | null) => {
    updateTask({
      variables: {
        input: {
          id: taskId,
          [name]: date,
        },
      },
    });
  };
  return editing ? (
    <DatePicker
      onSelect={(date) => {
        handleUpdateTask(date.toString());
      }}
      inputReadOnly
      open
      defaultValue={value ? dayjs(+value) : undefined}
      onOpenChange={(open) => !open && setEditing(false)}
    />
  ) : value ? (
    <>
      <Tag
        onClick={() => setEditing(true)}
        closable
        style={{ cursor: "pointer" }}
        onClose={() => {
          handleUpdateTask(null);
        }}
      >
        {dayjs(+value).format("YYYY-MM-DD")}
      </Tag>
    </>
  ) : (
    <Button icon={<CalendarOutlined />} onClick={() => setEditing(true)} />
  );
}

export default DateCell;
