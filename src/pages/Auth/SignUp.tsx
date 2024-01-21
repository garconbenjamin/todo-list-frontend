import { useMutation } from "@apollo/client";
import { Button, Input, Form, message } from "antd";

import { createUserGQL } from "@/api/user/gql";

type SignupFieldType = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

function SignUp() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [createUser, { loading }] = useMutation(createUserGQL, {
    onCompleted: () => {
      messageApi.success("User created successfully");
      form.resetFields();
    },
    onError: (error) => {
      messageApi.error(error.message);
    },
  });

  const submit = async (values: SignupFieldType) => {
    const { name, email, password } = values;
    createUser({
      variables: {
        input: {
          name,
          email,
          password,
        },
      },
    });
  };

  return (
    <Form onFinish={submit}>
      {contextHolder}
      <Form.Item<SignupFieldType>
        name="name"
        rules={[
          { max: 15, message: "Must be less than 15 chars" },
          { required: true, message: "Required" },
        ]}
      >
        <Input name="name" placeholder="name" />
      </Form.Item>
      <Form.Item<SignupFieldType>
        name="email"
        rules={[
          { type: "email", message: "The input is not valid E-mail!" },
          { required: true, message: "Please input your Email!" },
        ]}
      >
        <Input type="text" placeholder="email" />
      </Form.Item>

      <Form.Item<SignupFieldType>
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input type="password" placeholder="password" />
      </Form.Item>
      <Form.Item<SignupFieldType>
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input type="password" placeholder="confirm password" />
      </Form.Item>
      <Button htmlType="submit" loading={loading}>
        Submit
      </Button>
    </Form>
  );
}

export default SignUp;
