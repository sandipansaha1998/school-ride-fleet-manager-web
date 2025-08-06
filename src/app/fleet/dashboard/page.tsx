"use client";
import { useState } from "react";
type Bus = {
  id: number;
  name: string;
  status: string;
  driver: string;
  route: string;
};

const buses: Bus[] = [
  {
    id: 1,
    name: "Bus 101",
    status: "Active",
    driver: "Alice",
    route: "Route A",
  },
  { id: 2, name: "Bus 202", status: "Active", driver: "Bob", route: "Route B" },
  {
    id: 3,
    name: "Bus 303",
    status: "Inactive",
    driver: "Charlie",
    route: "Route C",
  },
];

export default function Dashboard() {
  const [selectedBus, setSelectedBus] = useState<Bus>(buses[0]);

  return <div className="bg-red-800">pan</div>;
}
