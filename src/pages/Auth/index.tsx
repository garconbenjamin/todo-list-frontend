import { useState } from "react";

import { Tabs, Card, Col, Row } from "antd";
import type { TabsProps } from "antd";

import Login from "./Login";
import SignUp from "./SignUp";

const items: TabsProps["items"] = [
  {
    key: "login",
    label: "Login",
    children: <Login />,
  },
  {
    key: "signup",
    label: "Signup",
    children: <SignUp />,
  },
];
function Auth() {
  const [formStatus, setFormStatus] = useState<"login" | "signup">("login");
  return (
    <Row justify="center">
      <Col span={8}>
        <Card>
          <Tabs
            defaultActiveKey="login"
            activeKey={formStatus}
            onChange={(key) => setFormStatus(key as "login" | "signup")}
            items={items}
          />
        </Card>
      </Col>
    </Row>
  );
}
export default Auth;
