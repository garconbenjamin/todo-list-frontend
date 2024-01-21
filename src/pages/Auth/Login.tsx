import { useState } from "react";

import { Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/user";
import { setUser } from "../../redux/actions";
type LoginFieldType = {
  email: string;
  password: string;
};

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const submit = async (values: LoginFieldType) => {
    const { email, password } = values;
    try {
      const { data } = await login({
        email,
        password,
      });
      messageApi.success("Logged in successfully");
      setUser(data);
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        messageApi.error(err?.message);
      } else {
        messageApi.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form
      onFinish={submit}
      initialValues={{
        email: "mark@gmail.com",
        password: "12345678",
      }}
    >
      {contextHolder}
      <Form.Item<LoginFieldType>
        name="email"
        rules={[
          { type: "email", message: "The input is not valid E-mail!" },
          { required: true, message: "Please input your Email!" },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item<LoginFieldType>
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input placeholder="Password" type="password" />
      </Form.Item>
      <Button htmlType="submit" loading={isLoading}>
        Submit
      </Button>
    </Form>
  );
}

export default Login;
