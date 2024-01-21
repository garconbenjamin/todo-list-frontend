import { useEffect, useState } from "react";

import { ReloadOutlined } from "@ant-design/icons";
import { CaretRightFilled, CaretDownFilled } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import type { TableColumnsType, TableProps } from "antd";
import { Button, Space, Table, Col, Row } from "antd";
import { groupBy } from "lodash";

import { getAllTasksByGroupGQL } from "@/api/task/gql";
import CreateNewTaskModal from "@/pages/Dashboard/CreateNewTaskModal";
import { useAppSelector } from "@/redux/hooks";

import {
  DateCell,
  FollowButton,
  TitleCell,
  NameBasic,
  AssigneeSelect,
} from "./Cells";
import type { DataType } from "./type";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

function TaskTable() {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const user = useAppSelector((state) => state.user);

  const { data, refetch } = useQuery(getAllTasksByGroupGQL, {
    variables: { groupId: user.groupId! },
  });

  useEffect(() => {
    if (data?.getAllTasksByGroup) {
      const firstTask = data?.getAllTasksByGroup[0];
      const dataConvertor = (task: typeof firstTask) => {
        const {
          id,
          title,

          dueTime,
          creator,
          assignee,
          followers,
          parentId,
          startTime,
        } = task;
        task;
        return {
          key: id!,
          id: id!,
          title: title || "",
          startTime: startTime || "",
          dueTime: dueTime || "",
          creator: creator?.name || "",
          assignee: assignee?.name,
          status: "",
          parentId: parentId || undefined,
          follow:
            followers?.some((follower) => follower.userId === user.id!) ||
            false,
        };
      };
      const { getAllTasksByGroup } = data;
      const groupedTasks = groupBy(getAllTasksByGroup, "parentId");

      const newTableData = groupedTasks["null"]?.map((task) => ({
        ...dataConvertor(task),
        children: groupedTasks[task.id!]?.map(dataConvertor),
      }));
      setTableData(newTableData);
    }
  }, [data, user.id]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Follow",
      dataIndex: "follow",
      key: "follow",

      fixed: "left",
      render: (value, record) => (
        <FollowButton value={value} record={record} hoveredRow={hoveredRow} />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      key: "id",
      fixed: "left",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (value: string, record) => (
        <TitleCell value={value} record={record} hoveredRow={hoveredRow} />
      ),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      sorter: (a, b) => +a.startTime - +b.startTime,
      render: (value, record) => (
        <DateCell value={value} taskId={record.id} name="startTime" />
      ),
    },
    {
      title: "Due Time",
      dataIndex: "dueTime",
      key: "dueTime",
      sorter: (a, b) => +a.dueTime - +b.dueTime,
      render: (value, record) => (
        <DateCell value={value} taskId={record.id} name="dueTime" />
      ),
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (value) => <NameBasic value={value} />,
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      render: (value, record) => (
        <AssigneeSelect value={value} record={record} />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const refresh = () => {
    refetch();
  };
  const handleMouseEnter = (record: DataType) => {
    setHoveredRow(record.id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const onRow = (record: DataType) => ({
    onMouseEnter: () => handleMouseEnter(record),
    onMouseLeave: handleMouseLeave,
  });
  return (
    <>
      <Row>
        <Col span={16}>
          <Space style={{ marginBottom: 16 }}></Space>
        </Col>

        <Col span={8} style={{ justifyContent: "right" }}>
          <Space style={{ justifyContent: "right" }}>
            <Button icon={<ReloadOutlined />} onClick={refresh}>
              Reload
            </Button>
            <CreateNewTaskModal />
          </Space>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={tableData}
        onRow={onRow}
        scroll={{
          y: "calc(100vh - 200px)",
          x: "calc(100vw - 100px)",
        }}
        rowClassName={(record) => {
          return record.parentId === undefined ? "parent-row" : "child-row";
        }}
        expandable={{
          expandIcon: ({
            expanded,
            onExpand,
            record,
          }: {
            expanded: boolean;
            onExpand: (
              record: DataType,
              e: React.MouseEvent<HTMLElement, MouseEvent>
            ) => void;
            record: DataType;
          }) =>
            record?.children?.length && record.parentId === undefined ? (
              expanded ? (
                <CaretDownFilled onClick={(e) => onExpand(record, e)} />
              ) : (
                <CaretRightFilled onClick={(e) => onExpand(record, e)} />
              )
            ) : (
              <></>
            ),
        }}
      />
    </>
  );
}
export default TaskTable;
