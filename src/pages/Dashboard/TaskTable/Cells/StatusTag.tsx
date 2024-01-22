import { Tag } from "antd";

import { TASK_STATUS, STATUS_COLOR } from "@/constant";

function StatusTag(props: { value?: number | string; onClick?: () => void }) {
  const { value, onClick } = props;

  return value ? (
    <Tag
      color={STATUS_COLOR[+value]}
      style={{
        cursor: onClick ? "pointer" : "",
      }}
      onClick={onClick}
    >
      {TASK_STATUS[+value]}
    </Tag>
  ) : null;
}
export default StatusTag;
