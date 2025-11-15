import GenericTable from "@/components/CustomTable";
import { TripProps } from "@/types/entities";
import { Avatar, Progress } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import {
  Armchair,
  CircleDot,
  Clock,
  Flag,
  Info,
  LocateIcon,
  LocationEditIcon,
  LucidePhone,
  MapIcon,
  MapPin,
  MapPinCheck,
  MapPinIcon,
  Percent,
  Route,
  UserCircle2Icon,
  UserCogIcon,
  Users,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const data: TripProps[] = [
  {
    id: "1",
    name: "Morning Trip",
    stops: [
      {
        students: [],
        stopDetails: {
          id: "1",
          address: "123 Main St",
          latitude: 40.7128,
          longitude: -74.006,
        },
        eta: "08:00 AM",
      },
      {
        students: [],
        stopDetails: {
          id: "3",
          address: "789 Oak Ave",
          latitude: 40.7138,
          longitude: -74.007,
        },
        eta: "08:15 AM",
      },
    ],
    bus: {
      id: "1",
      alias: "Bus 1",
      vehicleNumber: "ABC123",
      capacity: 50,
    },
    driver: {
      id: "d1",
      fullName: "John Doe",
      role: "driver",
      contactDetails: {
        phone: "123-456-7890",
        imageUrl: "/drivers/john_doe.jpg",
      },
    },
    operator: {
      id: "o1",
      fullName: "Jane Smith",
      role: "operator",
      contactDetails: {
        phone: "987-654-3210",
        imageUrl: "/operators/jane_smith.jpg",
      },
    },
    startingTime: "07:30 AM",
  },
  {
    id: "2",
    name: "Afternoon Trip",
    stops: [
      {
        students: [],
        stopDetails: {
          id: "2",
          address: "456 Elm St",
          latitude: 40.7128,
          longitude: -74.006,
        },
        eta: "01:00 PM",
      },
      {
        students: [],
        stopDetails: {
          id: "4",
          address: "321 Pine Rd",
          latitude: 40.7148,
          longitude: -74.008,
        },
        eta: "01:20 PM",
      },
    ],
    bus: {
      id: "2",
      alias: "Bus 2",
      vehicleNumber: "DEF456",
      capacity: 50,
    },
    driver: {
      id: "d2",
      fullName: "Alice Brown",
      role: "driver",
      contactDetails: {
        phone: "123-456-7890",
        imageUrl: "/drivers/alice_brown.jpg",
      },
    },
    operator: {
      id: "o2",
      fullName: "Bob White",
      role: "operator",
      contactDetails: {
        phone: "987-654-3210",
        imageUrl: "/operators/bob_white.jpg",
      },
    },
    startingTime: "12:30 PM",
  },
];

const TripsTable = () => {
  const columns: ColumnDef<TripProps>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) =>
        !expanded[info.row.id] ? (
          <div
            className="font-medium cursor-pointer flex justify-between "
            onClick={() => {
              setExpanded((prev) => ({
                ...prev,
                [info.row.id]: info.row.id,
              }));
            }}
          >
            {info.getValue() as string}
            <div className="flex gap-1">
              {" "}
              <Clock /> {"ETD"} : 6:30PM
            </div>
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
            <div>
              <div
                className=" cursor-pointer   flex justify-between  gap-4"
                onClick={() => {
                  setExpanded((prev) => ({
                    ...prev,
                    [info.row.id]: info.row.id,
                  }));
                }}
              >
                <div className="font-bold text-lg">
                  {info.getValue() as string}
                </div>
                <div className="flex gap-[50.5px]  items-center">
                  <div className="flex gap-1 items-center">
                    <Route />
                    <div className="text-gray-500 flex justify-center items-center ">
                      5 km
                    </div>
                    <div>Distance</div>
                  </div>
                  <div className="flex  items-center">
                    <Image
                      src="/icons/busStop.jpg"
                      alt="Bus stop sign"
                      width={40}
                      height={0}
                      className="border bg-transparent"
                    />
                    <div className="text-gray-500 flex justify-center items-center w-5 h-5">
                      5
                    </div>
                    <div>Stops</div>
                  </div>
                  <div className="flex  items-center gap-2">
                    <Users className="text-gray-600" />
                    <div className="text-gray-600 flex justify-center items-center ">
                      73
                    </div>
                    <div>PAX</div>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div className="flex items-center gap-2 py-1">
                  <MapPinIcon className="text-gray-400" />
                  <span>321 Pine Rd </span>{" "}
                </div>
                <div className="flex items-center gap-2 py-1">
                  <Clock className="text-gray-400" />
                  <div className="text-gray-600">6:30PM</div>
                </div>
                <div className="flex items-center gap-2 py-1   ">
                  <MapPinCheck className="text-gray-400" />
                  <span>456 Elm St</span>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <Clock className="text-gray-400" />

                  <div className="text-gray-600">6:30PM</div>
                </div>
              </div>
            </div>
          </div>
        ),
    },
    {
      header: "Bus",
      accessorFn: (row) => row.bus.alias,
      cell: (info) =>
        !expanded[info.row.id] ? (
          <span className="">{info.getValue() as string}</span>
        ) : (
          <div className="flex flex-col gap-2  ">
            <span className="">{info.getValue() as string}</span>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Armchair className="text-gray-600" />
                <span>50</span>
                <span>Seats</span>
              </div>
              <div className="text-gray-600 font-bold"> WB020BQ6167</div>
            </div>
            <div className="flex gap-2 text-gray-600 items-center    ">
              <Percent />
              Occupancy{" "}
              <Progress
                w={150}
                value={50}
                size="md"
                radius="md"
                color="green"
              />
              <div>50%</div>
            </div>
            <div className="border w-full border-gray-300 my-2"></div>

            <div className="flex gap-[10px] items-stretch   ">
              <div className=" ">
                <div className=" flex gap-2 items-start mb-2  ">
                  <Image
                    src="/icons/driver.png"
                    alt="Driver"
                    width={20}
                    height={20}
                    className=" border bg-transparent mt-0.5"
                  />
                  Driver
                </div>
                <div className=" flex gap-2 items-center ">Sandipan Saha</div>
                <div className=" flex gap-2 items-center ">
                  <LucidePhone size={18} />
                  +917872603130
                </div>
              </div>
              <div className="border border-gray-300 "></div>
              <div className="ms-3 ">
                <div className=" flex gap-2 items-start mb-2  ">
                  <UserCogIcon />
                  Operator
                </div>
                <div className=" flex gap-2 items-center ">
                  Souhardya Sarkar
                </div>
                <div className=" flex gap-2 items-center ">
                  <LucidePhone size={18} />
                  +918918570523
                </div>
              </div>
              <Info className="text-blue-500 ms-auto" />{" "}
            </div>
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

export default TripsTable;
