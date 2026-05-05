"use client";

import { useState } from "react";
import Link from "next/link";
import { AiFillDashboard } from "react-icons/ai";
import { FaTools } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`border-r border-black bg-background p-6 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`mb-6 flex items-center border rounded hover:bg-muted h-10 ${
          collapsed ? "justify-center w-full" : "justify-start px-3 w-full"
        }`}
      >
        {collapsed ? (
          <TbLayoutSidebarRightCollapseFilled />
        ) : (
          <TbLayoutSidebarLeftCollapseFilled />
        )}
      </button>

      <nav className="flex flex-col gap-2">
        <Link
          href="/dashboard"
          className={`rounded py-2 hover:bg-muted flex items-center ${
            collapsed ? "justify-center" : "px-3 gap-3"
          }`}
        >
          <AiFillDashboard />
          {!collapsed && "Dashboard"}
        </Link>

        <Link
          href="/items"
          className={`rounded py-2 hover:bg-muted flex items-center ${
            collapsed ? "justify-center" : "px-3 gap-3"
          }`}
        >
          <FaTools />
          {!collapsed && "Herramientas"}
        </Link>

        <Link
          href="/movements"
          className={`rounded py-2 hover:bg-muted flex items-center ${
            collapsed ? "justify-center" : "px-3 gap-3"
          }`}
        >
          <BiTransfer />
          {!collapsed && "Movimientos"}
        </Link>
      </nav>
    </aside>
  );
}