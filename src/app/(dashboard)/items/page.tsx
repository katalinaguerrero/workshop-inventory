"use client";

import { useRouter } from "next/navigation";
import { useItems } from "@/hooks/useItems";
import { ItemTable } from "@/components/items/ItemTable";
import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";

export default function ItemsPage() {
  const router = useRouter();
  const { items, loading, error } = useItems();

  if (loading) return <p>Cargando items...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Title title="Lista de herramientas e insumos" />

        <Button onClick={() => router.push("/items/new")}>
          + Nueva Herramienta / Insumo
        </Button>
      </div>

      {/* TABLE */}
      <ItemTable items={items} />
    </div>
  );
}