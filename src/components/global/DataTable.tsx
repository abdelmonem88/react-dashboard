import { Table } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { Dispatch, SetStateAction } from "react";

type Props = {
  columns: {}[];
  items: {
    id: number;
  }[];
  tableParams: {
    pagination: TablePaginationConfig;
  };
  setTableParams: Dispatch<
    SetStateAction<{ pagination: TablePaginationConfig }>
  >;
  loading: boolean;
};

const DataTable = ({
  columns,
  items,
  tableParams,
  setTableParams,
  loading,
}: Props) => {
  return (
    <div id="items_table" className="rounded-lg bg-white shadow">
      <Table
        columns={columns}
        dataSource={items.map((item: { id: number }) => ({
          ...item,
          key: item.id,
        }))}
        pagination={{
          ...tableParams.pagination,
        }}
        onChange={(pagination) => {
          setTableParams({
            pagination: {
              ...pagination,
            },
          });
        }}
        rowKey={(record) => record.id}
        loading={loading}
        scroll={{
          y: 500,
        }}
      />
    </div>
  );
};

export default DataTable;
