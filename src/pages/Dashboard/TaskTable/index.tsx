import { useMemo } from "react";

import { ReloadOutlined } from "@ant-design/icons";
import { CaretRightFilled, CaretDownFilled } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import type { TableColumnsType } from "antd";
import { Button, Space, Table, Col, Row, Spin } from "antd";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { groupBy } from "lodash";

import { getAllTasksByGroupGQL } from "@/api/task/gql";
import { useGroupUsers } from "@/api/user";
import CreateNewTaskModal from "@/pages/Dashboard/CreateNewTaskModal";
import TaskInfoModal from "@/pages/Dashboard/TaskInfoModal";
import { useAppSelector } from "@/redux/hooks";

import {
  DateCell,
  TitleCell,
  NameBasic,
  AssigneeSelect,
  StatusSelect,
  FilterDateRange,
} from "./Cells";
import type { DataType } from "../type";
dayjs.extend(isBetween);

function TaskTable() {
  const user = useAppSelector((state) => state.user);
  const { data: users } = useGroupUsers();
  const { data, refetch, loading } = useQuery(getAllTasksByGroupGQL, {
    variables: { groupId: user.groupId! },
  });

  const tableData = useMemo(() => {
    if (!data || !data.getAllTasksByGroup) return [];

    if (data?.getAllTasksByGroup) {
      const firstTask = data?.getAllTasksByGroup[0];
      const dataConvertor = (task: typeof firstTask) => {
        const {
          id,
          title,
          status,
          dueTime,
          creator,
          assignee,
          follower,
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
          creator: { id: creator!.id, name: creator!.name },
          assignee: { id: assignee?.id, name: assignee?.name },
          follower: { id: follower?.id, name: follower?.name },
          status: status!,
          parentId: parentId || undefined,
        };
      };
      const { getAllTasksByGroup } = data;
      const groupedTasks = groupBy(getAllTasksByGroup, "parentId");

      const newTableData = groupedTasks["null"]?.map((task) => ({
        ...dataConvertor(task),
        children: groupedTasks[task.id!]?.map(dataConvertor),
      }));
      return newTableData || [];
    }
  }, [data]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      key: "id",
      fixed: "left",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (value: string, record) => (
        <TitleCell value={value} record={record} />
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
      filterDropdown: (props) => <FilterDateRange {...props} />,
      onFilter: (value, record) => {
        const [startDate, endDate] = value as unknown as [
          Dayjs | null,
          Dayjs | null
        ];
        return dayjs(+record.dueTime).isBetween(
          dayjs(startDate),
          dayjs(endDate)
        );
      },
      sorter: (a, b) => +a.dueTime - +b.dueTime,
      render: (value, record) => (
        <DateCell value={value} taskId={record.id} name="dueTime" />
      ),
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      filters: users?.getUsersByGroup.map((user) => ({
        text: user.name,
        value: user.id,
      })),
      onFilter: (value, record) => record.creator?.id === value,
      render: (value) => {
        return <NameBasic value={value.name} />;
      },
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      filters: users?.getUsersByGroup.map((user) => ({
        text: user.name,
        value: user.id,
      })),
      onFilter: (value, record) => record.assignee?.id === value,

      render: (value, record) => {
        return (
          <AssigneeSelect
            fieldName="assigneeId"
            value={value}
            record={record}
          />
        );
      },
    },
    {
      title: "Follower",
      dataIndex: "follower",
      key: "follower",
      render: (value, record) => {
        return (
          <AssigneeSelect
            fieldName="followerId"
            value={value}
            record={record}
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value, record) => <StatusSelect value={value} record={record} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <TaskInfoModal task={record} />,
    },
  ];

  const refresh = () => {
    refetch();
  };

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

      {loading ? (
        <Spin />
      ) : (
        Boolean(tableData) && (
          <Table
            columns={columns}
            dataSource={tableData}
            scroll={{
              y: "calc(100vh - 200px)",
              x: "calc(100vw - 100px)",
            }}
            rowClassName={(record) => {
              return record.parentId === undefined ? "parent-row" : "child-row";
            }}
            expandable={{
              defaultExpandAllRows: true,
              indentSize: 50,
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
        )
      )}
    </>
  );
}
export default TaskTable;
