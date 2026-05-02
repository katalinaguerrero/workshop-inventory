"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import type { Item } from "@/types/item";
import { getItemById } from "@/services/items.service";
import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { getItemTypeLabel } from "@/lib/utils";
import { FaBoxOpen, FaTools } from "react-icons/fa";

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
    <div className="max-w-full mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div className="border border-black rounded-xl p-6 grid gap-3">
        {/* IMAGE */}
        {item.imgUrl && (
          <div className="mb-4">
            <div className="relative w-full max-w-sm h-96">
              <Image
                src={item.imgUrl}
                alt={item.name}
                fill
                className="object-cover rounded-lg border"
              />
            </div>
          </div>
        )}

        <Title title={item.name} />

        <div className="border rounded-lg p-3 bg-muted/30">
          <p className="text-xs text-muted-foreground font-bold"> Tipo</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{getItemTypeLabel(item.type)}</p>
            {item.type === "tool" ? (
              <FaTools className="text-gray-600" />
            ) : (
              <FaBoxOpen className="text-gray-600" />
            )}
          </div>
        </div>
        <div className="border rounded-lg p-3 bg-muted/30">
          <p className="text-xs text-muted-foreground font-bold">
            {" "}
            Stock Disponible
          </p>
          <p className="font-medium">{item.stock}</p>
        </div>
      </div>

      {/* SPECIFICATIONS */}
      <div className="border border-black rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Especificaciones</h2>

        {item.specifications?.length ? (
          <div className="grid grid-cols-2 gap-3">
            {item.specifications.map((spec, index) => (
              <div key={index} className="border rounded-lg p-3 bg-muted/30">
                <p className="text-xs text-muted-foreground font-bold">
                  {spec.key}
                </p>
                <p className="font-medium">{spec.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No hay especificaciones registradas
          </p>
        )}
      </div>

      <Button onClick={() => router.push(`/items/${id}/edit`)}>Editar</Button>
    </div>
  );
}
