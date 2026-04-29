"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getItemById, updateItem } from "@/services/items.service";
import { ItemForm } from "@/components/items/ItemForm";
import type { Item } from "@/types/item";

export default function EditItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const data = await getItemById(id);
      setItem(data);
    };

    load();
  }, [id]);

  const handleSubmit = async (data: Omit<Item, "id">) => {
    if (!id) return;
    console.log(item);
    await updateItem(id, data);
    router.push(`/items/${id}`);
  };

  if (!item) return <div>Cargando...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">
        Editar Item
      </h1>

      <ItemForm
        initialData={item}
        onSubmit={handleSubmit}
      />
    </div>
  );
}