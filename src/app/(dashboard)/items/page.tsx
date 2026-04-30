"use client";

import { useRouter } from "next/navigation";
import { useItems } from "@/hooks/useItems";
import { ItemTable } from "@/components/items/ItemTable";
import { Title } from "@/components/ui/Title";

export default function ItemsPage() {
  const router = useRouter();
  const { items, loading, error } = useItems();

  if (loading) return <p>Cargando items...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
       <Title title="Lista de herramientas e insumos"/>
    <ItemTable items={items}></ItemTable>
    </div>
  );
}