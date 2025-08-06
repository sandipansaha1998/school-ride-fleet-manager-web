"use client";
import React from "react";
import { CustomTable } from "@/components/CustomTable";
import { Bus } from "lucide-react";

type BusInfo = {
  alias: string;
  vehicleNumber: string;
  capacity: number;
  activeRoute?: string;
};

type BusManagerProps = {
  buses: BusInfo[];
  onAddBus?: () => void;
};

const BusManager: React.FC<BusManagerProps> = ({ buses, onAddBus }) => {
  buses = buses || [];
  return (
    <div className="flex flex-col gap-2 min-h-screen flex-1">
      <div className="flex ms-10 mt-10 gap-2 items-center justify-between me-5">
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-bold">Manage your Buses</div>
          <div className="text-xl">
            Easily add, view, and manage all your buses in one place.
          </div>
        </div>
        <div
          className="shadow px-5 py-3 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black font-semibold flex items-center gap-2"
          onClick={onAddBus}
        >
          <Bus className="h-5 w-5" />
          Add Bus
        </div>
      </div>
      <div className="max-h-screen overflow-y-auto ps-10 pe-2">
        <hr className="border-t-3 border-gray-200 w-full mx-auto my-3" />
        <CustomTable
          key={"buses-table"}
          headers={["Alias", "Vehicle Number", "Capacity", " Active Route"]}
          data={buses.map((bus) => ({
            Alias: bus.alias,
            "Vehicle Number": bus.vehicleNumber,
            Capacity: bus.capacity,
          }))}
        />
      </div>
    </div>
  );
};

export default BusManager;
