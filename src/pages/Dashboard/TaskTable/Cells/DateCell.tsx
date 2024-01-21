import { useState } from "react";

import { CalendarOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Button, Tag, DatePicker } from "antd";
import dayjs from "dayjs";

import { getAllTasksByGroupGQL, updateTaskGQL } from "@/api/task/gql";
import { useAppSelector } from "@/redux/hooks";

function DateCell(props: { value: string; taskId: number; name: string }) {
  const { value, taskId, name } = props;
  const [editing, setEditing] = useState(false);
  const user = useAppSelector((state) => state.user);
  const [updateTask] = useMutation(updateTaskGQL, {
    refetchQueries: [
      {
        query: getAllTasksByGroupGQL,
        variables: { groupId: user.groupId! },
      },
    ],
  });
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
