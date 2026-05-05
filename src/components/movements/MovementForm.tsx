"use client";

import { useState } from "react";
import type { Item } from "@/types/item";
import type { MovementType } from "@/types/movement";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "../ui/Spinner";

type Props = {
  items: Item[];
  onSubmit: (
    itemId: string,
    type: MovementType,
    quantity: number
  ) => Promise<void>;
};

export function MovementForm({
  items,
  onSubmit,
}: Props) {
  const [itemId, setItemId] = useState("");
  const [type, setType] = useState<MovementType>("IN");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!itemId || quantity <= 0) return;

    try {
      setLoading(true);

      await onSubmit(itemId, type, quantity);

      setQuantity(1);
      setItemId("");
      setType("IN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-xl p-6 space-y-4 bg-background"
    >
      <h2 className="text-lg font-semibold">Nuevo Movimiento</h2>

      {/* ITEM */}
      <select
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      >
        <option value="">Selecciona item</option>

        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} ({item.stock})
          </option>
        ))}
      </select>

      {/* TYPE */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value as MovementType)}
        className="border rounded px-3 py-2 w-full"
      >
        <option value="in">Entrada</option>
        <option value="out">Salida</option>
      </select>

      {/* QUANTITY */}
      <Input
        type="number"
        min={0}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <Button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2"
      >
        {loading && <Spinner />}
        {loading ? "Guardando..." : "Registrar Movimiento"}
      </Button>

    </form>
  );
}