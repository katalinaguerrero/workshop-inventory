"use client";

import { useEffect, useState } from "react";
import { ItemTable } from "@/components/items/ItemTable";
import type { Item } from "@/types/item";
import { getItems } from "@/services/items.service";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await getItems();
        setItems(data);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Items</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar Item
        </button>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Cargando items...</div>
      ) : (
        <ItemTable items={items} />
      )}
    </div>
  );
}