"use client";

import { ItemForm } from "@/components/items/ItemForm";
import { createItem } from "@/services/items.service";
import { useRouter } from "next/navigation";
import type { Item } from "@/types/item";

export default function NewItemPage() {
  const router = useRouter();

  const handleSubmit = async (data: Omit<Item, "id">) => {
    await createItem(data);
    router.push("/items");
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">
        Agregar Nuevo
      </h1>

      <ItemForm onSubmit={handleSubmit} />
    </div>
  );
}