"use client";
import React from "react";
import { Info } from "lucide-react";
import GenericTable from "@/components/CustomTable";
import TripsTable from "./components/TripsTable";

type Student = { name: string; info: string };

type StopETA = {
  stopName: string;
  eta: string;
  students: Student[];
};

type TripInfo = {
  busAssigned: string;
  startingETA: string;
  stops: StopETA[];
};

const tripsData: TripInfo[] = [
  {
    busAssigned: "Bus 12",
    startingETA: "08:00 AM",
    stops: [
      {
        stopName: "Stop 1",
        eta: "08:10 AM",
        students: [
          { name: "Alice", info: "Grade 5" },
          { name: "Bob", info: "Grade 4" },
        ],
      },
      {
        stopName: "Stop 2",
        eta: "08:20 AM",
        students: [{ name: "Charlie", info: "Grade 3" }],
      },
    ],
  },
  {
    busAssigned: "Bus 15",
    startingETA: "08:30 AM",
    stops: [
      {
        stopName: "Stop A",
        eta: "08:40 AM",
        students: [{ name: "David", info: "Grade 2" }],
      },
    ],
  },
];

/* ---------------------- COLUMNS ----------------------- */

/* ---------------------- MAIN TABLE ----------------------- */

const TripsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 min-h-screen flex-1">
      <div className="flex ms-10 mt-10 gap-2 items-center justify-between me-5">
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-bold">Manage your Trips</div>
          <div className="text-xl">
            View and manage all trips, stops, and assigned students.
          </div>
        </div>
      </div>
      <div className="max-h-screen overflow-y-auto ps-10 pe-2">
        <hr className="border-t-3 border-gray-200 w-full mx-auto my-3" />
        <div className="mantine-datatable"></div>
      </div>

      {/* Top level: Trips */}
      <TripsTable />
    </div>
  );
};

export default TripsPage;
