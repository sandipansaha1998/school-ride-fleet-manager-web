import GenericTable from "@/components/CustomTable";
import { BusRouteInfoType } from "@/types/maps";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

const RoutesTable = ({
  data,
  onViewRoute,
}: {
  data: BusRouteInfoType[];
  onViewRoute: (id: number) => void;
}) => {
  const columns: ColumnDef<BusRouteInfoType>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) =>
        !expanded[info.row.id] ? (
          <div className="font-medium cursor-pointer flex justify-between ">
            {info.getValue() as string}
            <div className="flex gap-1"> </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setExpanded((prev) => ({
                ...prev,
                [info.row.id]: null,
              }));
            }}
            className="cursor-pointer   "
          >
            <div></div>
          </div>
        ),
    },
    {
      header: "Active Bus",
      accessorFn: (row) => row.activeBuses,
      cell: (info) => info.getValue(),
    },
    {
      header: "View Route",
      accessorKey: "id",
      cell: (info) => (
        <div
          className="text-blue-600 underline cursor-pointer"
          onClick={() => onViewRoute(info.row.index)}
        >
          View Route
        </div>
      ),
    },
  ];
  const [expanded, setExpanded] = useState<Record<string, string | null>>({});
  return (
    <div className="p-[20px]">
      <GenericTable data={data} columns={columns} />
    </div>
  );
};

export default RoutesTable;
