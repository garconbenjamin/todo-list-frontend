import { useState } from "react";

import { Button, Space, DatePicker } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);
const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

function FilterDateRange(props: FilterDropdownProps) {
  const { setSelectedKeys, confirm, clearFilters } = props;

  const [value, setValue] = useState<RangeValue>(null);

  return (
    <Space direction="vertical" style={{ padding: 5, alignItems: "end" }}>
      <Space>
        <RangePicker
          onCalendarChange={(date) => {
            setValue(date);
          }}
          value={value}
          onOpenChange={(open) => {
            if (!open) {
              if (value) {
                const keys = [value] as unknown as React.Key[];
                setSelectedKeys(keys);
              }
            }
          }}
        />
      </Space>
      <div>
        <Space>
          <Button
            size="small"
            type="text"
            onClick={() => {
              clearFilters && clearFilters();
              confirm();
              setValue(null);
            }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              confirm();
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    </Space>
  );
}
export default FilterDateRange;
