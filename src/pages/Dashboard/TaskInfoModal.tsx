import React, { useState } from "react";

import { MoreOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Modal,
  message,
  List,
  Avatar,
  Tooltip,
} from "antd";
import dayjs from "dayjs";

import { useUpdateTask } from "@/api/task";
import { getTaskLogsGQL } from "@/api/task/gql";
import { useGroupUsers } from "@/api/user";
import StatusTag from "@/pages/Dashboard/TaskTable/Cells/StatusTag";

import type { DataType } from "./type";

type CreateTaskFieldType = {
  title: string;
  description: string;
  startTime: string;
  dueTime: string;
};
type TaskInfoModalProps = {
  trigger?: React.ReactNode;
  task: DataType;
};

const Trigger = (
  <Button type="default">
    Info
    <MoreOutlined />
  </Button>
);
const History = (props: { taskId: number }) => {
  const { taskId } = props;
  const { data } = useQuery(getTaskLogsGQL, {
    variables: { taskId },
  });

  const { data: groupUsers } = useGroupUsers();
  if (data?.taskLogs.length === 0) return <></>;
  return (
    <List
      itemLayout="horizontal"
      dataSource={data?.taskLogs}
      renderItem={(item) => {
        const { action, user, status, createdAt } = item;
        const createTitle = () => {
          if (action === "assigneeId") {
            return `${user!.name} asssigned to ${
              status !== "Null" && Number(status)
                ? groupUsers?.getUsersByGroup.find(
                    (user) => user.id === Number(status)
                  )?.name
                : "Null"
            }`;
          }
          if (action === "status") {
            return (
              <>
                {`${user!.name} changed status to `}
                <StatusTag value={status!} />
              </>
            );
          }
        };
        return (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Tooltip title={`${user?.name} <${user?.email}>`}>
                  <Avatar>{user?.name[0]?.toUpperCase()}</Avatar>
                </Tooltip>
              }
              title={createTitle()}
              description={dayjs(+createdAt!).format("YYYY-MM-DD HH:mm:ss")}
            />
          </List.Item>
        );
      }}
    />
  );
};
function TaskInfoModal(props: TaskInfoModalProps) {
  const { trigger = Trigger, task } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const { id: taskId, title, startTime, dueTime, description } = task;

  const [updateTask] = useUpdateTask({
    options: {
      onCompleted: () => {
        closeModal();
      },
      onError: (err) => {
        messageApi.error(err.message);
      },
    },
    taskId: task.id,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleCreateTask = (task: CreateTaskFieldType) => {
    updateTask({
      variables: {
        input: {
          id: taskId,
          ...task,
        },
      },
    });
  };

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement, {
        onClick: openModal,
      })}
      {contextHolder}
      <Modal
        title={title}
        open={modalOpen}
        onCancel={closeModal}
        okButtonProps={{
          onClick: () => form.submit(),
        }}
      >
        {modalOpen && (
          <>
            <Form
              onFinish={handleCreateTask}
              form={form}
              initialValues={{
                title,
                description,
                startTime: startTime ? dayjs(+startTime) : undefined,
                dueTime: dueTime ? dayjs(+dueTime) : undefined,
              }}
            >
              <Form.Item<CreateTaskFieldType>
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter a title" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<CreateTaskFieldType>
                label="Description"
                name="description"
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item<CreateTaskFieldType>
                label="Start Time"
                name="startTime"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item<CreateTaskFieldType> label="Due Time" name="dueTime">
                <DatePicker />
              </Form.Item>
            </Form>
            {taskId && <History taskId={taskId!} />}
          </>
        )}
      </Modal>
    </>
  );
}

export default TaskInfoModal;
