import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import CreateNewTaskModal from "@/pages/Dashboard/CreateNewTaskModal";

import { DataType } from "../../type";

function TitleCell(props: { value: string; record: DataType }) {
  const { value, record } = props;
  return (
    <Space>
      {value}
      {!record.parentId && (
        <CreateNewTaskModal
          parentId={record.id}
          title="Add child task"
          trigger={
            <Tooltip title="Add child task">
              <Button size="small" icon={<PlusOutlined />} />
            </Tooltip>
          }
        />
      )}
    </Space>
  );
}
export default TitleCell;
