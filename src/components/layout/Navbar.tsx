"use client";

import { usePathname } from "next/navigation";
import { getRouteTitle } from "@/constants/routes";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-black bg-background px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-bold">Inventario Industrial</h1>

      <span className="text-sm text-muted-foreground">
        {getRouteTitle(pathname)}
      </span>
    </header>
  );
}