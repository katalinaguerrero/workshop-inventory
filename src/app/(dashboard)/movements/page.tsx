"use client";

import { useItems } from "@/hooks/useItems";
import { useMovements } from "@/hooks/useMovements";

import { MovementForm } from "@/components/movements/MovementForm";
import { MovementTable } from "@/components/movements/MovementTable";
import { Title } from "@/components/ui/Title";

export default function MovementsPage() {
  const { items } = useItems();
  const { movements, loading, addMovement } = useMovements();

  if (loading) return <p>Cargando Movimientos...</p>;

  return (
    <div className="p-6">
      <MovementForm items={items} onSubmit={addMovement} />
      <Title title="Lista de Movimientos" />
      <MovementTable movements={movements} />
    </div>
  );
}