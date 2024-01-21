import { Tag } from "antd";

function NameBasic({ value }: { value: string }) {
  return value ? (
    <Tag> {value.slice(0, 1).toUpperCase() + value.slice(1)}</Tag>
  ) : (
    <></>
  );
}
export default NameBasic;
