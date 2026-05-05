"use client";

import { useItems } from "@/hooks/useItems";
import { useMovements } from "@/hooks/useMovements";
import { getMovementLabel } from "@/lib/utils";

export default function DashboardPage() {
  const { items } = useItems();
  const { movements } = useMovements();

  const totalItems = items.length;
  const totalStock = items.reduce((acc, item) => acc + item.stock, 0);

  const totalMovements = movements.length;

  const recentMovements = movements.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-black rounded p-4">
          <p className="text-sm text-muted-foreground">Herramientos/Insumos Totales</p>
          <p className="text-2xl font-bold">{totalItems}</p>
        </div>

        <div className="border border-black rounded p-4">
          <p className="text-sm text-muted-foreground">Stock Total</p>
          <p className="text-2xl font-bold">{totalStock}</p>
        </div>

        <div className="border border-black rounded p-4">
          <p className="text-sm text-muted-foreground">Movimientos</p>
          <p className="text-2xl font-bold">{totalMovements}</p>
        </div>
      </div>

      {/* ACTIVIDAD RECIENTE */}
      <div className="border rounded p-4">
        <h2 className="font-semibold mb-3">Últimos movimientos</h2>

        <ul className="space-y-2">
          {recentMovements.map((m) => (
            <li
              key={m.id}
              className="flex justify-between text-sm border-b pb-1"
            >
              <span>{m.itemName}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                  m.type.toUpperCase() === "IN"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                {getMovementLabel(m.type)} ({m.quantity})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}