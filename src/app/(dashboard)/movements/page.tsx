"use client";

import { useState } from "react";
import { useItems } from "@/hooks/useItems";
import { useMovements } from "@/hooks/useMovements";
import { MovementType } from "@/types/movement";

import { MovementTable } from "@/components/movements/MovementTable";
import { MovementTypeSelect } from "@/components/movements/MovementTypeSelect";
import { ItemSelect } from "@/components/items/ItemSelect";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type MovementForm = {
  itemId: string;
  type: MovementType | "";
  quantity: number;
  reason: string;
};

export default function MovementsPage() {
  const { items } = useItems();
  const { movements, addMovement } = useMovements();

  const [form, setForm] = useState<MovementForm>({
    itemId: "",
    type: "",
    quantity: 1,
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.itemId || !form.type) return;

  const item = items.find((i) => i.id === form.itemId);

  await addMovement({
    itemId: form.itemId,
    itemName: item?.name || "Unknown",
    type: form.type,
    quantity: form.quantity,
    reason:form.reason
  });

  setForm({
    itemId: "",
    type: "",
    quantity: 1,
    reason:"",
  });
};

  return (
    <div style={{ padding: 20 }}>
      <h1>Registrar Movimientos</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 10, marginBottom: 20 }}
      >
        <ItemSelect
          items={items}
          value={form.itemId}
          onChange={(val) => setForm({ ...form, itemId: val })}
        />
        <MovementTypeSelect
          value={form.type}
          onChange={(val) => setForm({ ...form, type: val })}
        />

        <Input
          type="number"
          min={1}
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: Number(e.target.value),
            })
          }
        />
      <Input value={form.reason} onChange={(e) =>
            setForm({
              ...form,
              reason: String(e.target.value),
            })
          } placeholder="Razón" />


        <Button type="submit" >Registrar</Button>
      </form>

      {/* TABLE */}
      <MovementTable movements={movements} />
    </div>
  );
}