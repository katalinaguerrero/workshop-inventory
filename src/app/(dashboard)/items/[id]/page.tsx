"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Item } from "@/types/item";
import { getItemById } from "@/services/items.service";
import { Button } from "@/components/ui/Button";

export default function ItemDetailPage() {
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

  if (loading) return <div className="p-6">Cargando...</div>;
  if (!item) return <div className="p-6">Item no encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="border rounded-xl p-6">
        <h1 className="text-2xl font-bold">{item.name}</h1>

        <p className="text-muted-foreground">
          Stock: {item.stock}
        </p>

        <p className="text-sm mt-1">
          Tipo: {item.type}
        </p>
      </div>

      {/* SPECIFICATIONS */}
      <div className="border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Especificaciones
        </h2>

        {item.specifications?.length ? (
          <div className="grid grid-cols-2 gap-3">
            {item.specifications.map((spec, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 bg-muted/30"
              >
                <p className="text-xs text-muted-foreground">
                  {spec.key}
                </p>
                <p className="font-medium">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No hay especificaciones registradas
          </p>
        )}
      </div>

      <Button onClick={() => router.push(`/items/${id}/edit`)}>
        Editar
      </Button>
    </div>
  );
}