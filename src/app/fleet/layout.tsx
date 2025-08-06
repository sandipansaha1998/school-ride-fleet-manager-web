import React from "react";
import { MantineProvider } from "@mantine/core";
import Sidebar from "@/components/Sidebar";
import { SchoolProvider } from "@/context/SchoolContext";

export default function FleetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 overflow-hidden  ">
      <SchoolProvider>
        <MantineProvider>
          <Sidebar />
          {children}
        </MantineProvider>
      </SchoolProvider>
    </div>
  );
}
