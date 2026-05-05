"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getItemById, updateItem } from "@/services/items.service";
import { ItemForm } from "@/components/items/ItemForm";
import type { Item } from "@/types/item";
import { Title } from "@/components/ui/Title";

export default function EditItemPage() {
  const router = useRouter();

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      setLoading(true);
      const data = await getItemById(id);
      setItem(data);
      setLoading(false);
    };

    load();
  }, [id]);

  const handleSubmit = (data: unknown) => {
    if (!id) return;

    updateItem(id, data as Omit<Item, "id">);
    router.push(`/items/${id}`);
  };


  if (loading) return <div>Cargando...</div>;
  if (!item) return <div>Item no encontrado</div>;

  return (
    <div className="max-w-full mx-auto p-6">
      <Title title="Editar Item" />

      <ItemForm
        initialData={item}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
