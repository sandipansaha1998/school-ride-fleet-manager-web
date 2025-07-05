"use client";

import { Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { DataTable } from "mantine-datatable";

type TableProps = {
  headers: string[];
  data: any[];
};

export function CustomTable(tableProps: TableProps) {
  const { headers, data } = tableProps;
  return (
    <DataTable
      className="cursor-pointer"
      withTableBorder
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      records={data}
      columns={headers.map((header: string) => {
        return { accessor: header };
      })}
    />
  );
}
