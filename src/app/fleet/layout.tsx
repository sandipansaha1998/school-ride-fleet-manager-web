import React from "react";
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
        <Sidebar />
        {children}
      </SchoolProvider>
    </div>
  );
}
