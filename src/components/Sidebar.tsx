"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bus,
  BusFrontIcon,
  ChevronsLeft,
  GraduationCap,
  LayoutDashboard,
  Navigation,
  PanelLeftClose,
  PersonStanding,
  Route,
  School,
} from "lucide-react";
import brandLogo from "@/assets/images/brand.png";
import { DAVSchool } from "@/seedData/identity";

const navItems = [
  { label: "Dashboard", href: "/fleet/dashboard", icon: LayoutDashboard },
  { label: "Routes", href: "/fleet/routes", icon: Route },
  { label: "Students", href: "/fleet/students", icon: GraduationCap },
  { label: "Bus", href: "/fleet/bus", icon: BusFrontIcon },
  { label: "Trips", href: "/fleet/trips", icon: Bus },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className=" w-1/6  flex flex-col   border-r-2 border-gray-300  p-2 ">
      <div className="flex items-center justify-between  ms-1 mt-5 mb-3 ">
        <div className="h-12">
          <img
            src={brandLogo.src}
            alt="Brand Logo"
            className="w-full h-full "
          />
        </div>
        <div className="bg-sky-">
          <PanelLeftClose className="w-6 h-6" />
        </div>
      </div>
      <hr className="border-t-3 border-gray-200  w-full mx-auto" />
      <div className="bg-gray-100 h-15  my-5 flex border border-gray-300 rounded-lg  ">
        <div className=" text-2xl p-3">
          <School />
        </div>
        <div className="flex flex-col my-auto overflow-hidden">
          <div className=" font-semibold truncate " title="Holy Child School">
            {DAVSchool.name}
          </div>
          <span>{DAVSchool.code}</span>
        </div>
      </div>
      <hr className="border-t-3 border-gray-200  w-full mx-auto" />

      <nav className="mt-5 flex flex-col gap-4 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex gap-2 items-center px-4 py-3 mx-[2px] rounded-lg  cursor-pointer h-[60px]
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#FFF3B0] to-[#FFE27A] text-black font-semibold  "
                    : "bg-white text-gray-800 hover:bg-yellow-100"
                }`}
            >
              <Icon className="w-7 h-7" />
              <span className="text-md">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
