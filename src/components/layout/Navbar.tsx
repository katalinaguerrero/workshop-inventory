"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { getRouteTitle } from "@/constants/routes";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-black bg-background px-6 py-4 flex items-center justify-between">

      {/* LEFT: logo + title */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Inventario Industrial logo"
          width={28}
          height={28}
        />

        <h1 className="text-lg font-bold">
          Inventario Mécanica Industrial
        </h1>
      </div>

      {/* RIGHT: route title */}
      <span className="text-sm text-muted-foreground">
        {getRouteTitle(pathname)}
      </span>
    </header>
  );
}