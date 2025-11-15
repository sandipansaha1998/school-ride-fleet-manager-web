import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

type GenericTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

export default function GenericTable<T>({
  data,
  columns,
}: GenericTableProps<T>) {
  const [expanded, setExpanded] = useState<Record<string, string | null>>({});

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <table className=" w-full border border-gray-300">
      <thead className="bg-transparent ">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className=" px-4 py-2 text-left font-bold text-lg border border-gray-300"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className=" align-top border border-gray-300 hover:bg-gray-100"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className=" px-4 py-2  border border-gray-300 ">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
