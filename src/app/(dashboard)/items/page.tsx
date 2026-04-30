"use client";

import { useRouter } from "next/navigation";
import { useItems } from "@/hooks/useItems";
import { ItemTable } from "@/components/items/ItemTable";

export default function ItemsPage() {
  const router = useRouter();
  const { items, loading, error } = useItems();

  if (loading) return <p>Cargando items...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de herramientas e insumos</h1>
    <ItemTable items={items}></ItemTable>
    </div>
  );
}