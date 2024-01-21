import { useState } from "react";
import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Form, Input, DatePicker, Button, Modal, message } from "antd";

import { createTaskGQL } from "@/api/task/gql";

import { useAppSelector } from "../../redux/hooks";

type CreateTaskFieldType = {
  title: string;
  description: string;
  startTime: string;
  dueTime: string;
};
type CreateNewTaskModalProps = {
  trigger?: React.ReactNode;
  title?: string;
};

const Trigger = (
  <Button type="primary" icon={<PlusOutlined />}>
    New Task
  </Button>
);

function CreateNewTaskModal(props: CreateNewTaskModalProps) {
  const { trigger = Trigger, title = "New Task" } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [createTask] = useMutation(createTaskGQL, {
    onError: (error) => {
      messageApi.error(error.message);
    },
    onCompleted: () => {
      messageApi.success("Created task successfully");
      closeModal();
    },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.user);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    form.resetFields();
  };
  const handleCreateTask = (task: CreateTaskFieldType) => {
    createTask({
      variables: {
        input: {
          ...task,
          creatorId: user.id!,
          groupId: user.groupId!,
        },
      },
    });
  };

  return (
    <>
      {contextHolder}

      {React.cloneElement(trigger as React.ReactElement, {
        onClick: openModal,
      })}

      <Modal
        title={title}
        open={modalOpen}
        onCancel={closeModal}
        okButtonProps={{
          onClick: () => form.submit(),
        }}
      >
        <Form onFinish={handleCreateTask} form={form}>
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
          <Form.Item<CreateTaskFieldType> label="Start Time" name="startTime">
            <DatePicker />
          </Form.Item>
          <Form.Item<CreateTaskFieldType> label="Due Time" name="dueTime">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateNewTaskModal;
