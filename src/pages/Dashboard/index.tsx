import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Layout, Typography } from "antd";

import { clearUser } from "@/redux/actions";

import TaskTable from "./TaskTable";
const { Header, Content } = Layout;
const { Title } = Typography;
const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={2} style={{ color: "white" }}>
            Todo List
          </Title>
          <Button icon={<PoweroffOutlined />} onClick={clearUser}>
            Log out
          </Button>
        </Header>
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
