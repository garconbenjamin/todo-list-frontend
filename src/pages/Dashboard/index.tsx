import { useState } from "react";

import {
  StarOutlined,
  PushpinOutlined,
  HistoryOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";

import { clearUser } from "@/redux/actions";

import TaskTable from "./TaskTable";
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<StarOutlined />}>
            Owned
          </Menu.Item>
          <Menu.Item key="2" icon={<PushpinOutlined />}>
            Subscribed
          </Menu.Item>
          <Menu.Item key="3" icon={<HistoryOutlined />}>
            Activities
          </Menu.Item>
          <Button icon={<LogoutOutlined />} onClick={clearUser}>
            Log out
          </Button>
        </Menu>
        <Button
          type="primary"
          shape="circle"
          onClick={toggle}
          icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="bg-blue-200">List</Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <TaskTable />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
