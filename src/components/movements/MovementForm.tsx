"use client";

import { useState } from "react";
import type { Item } from "@/types/item";
import type { MovementType } from "@/types/movement";

import { ItemSelect } from "@/components/items/ItemSelect";
import { MovementTypeSelect } from "@/components/movements/MovementTypeSelect";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Title } from "../ui/Title";

type MovementFormState = {
  itemId: string;
  type: MovementType | "";
  quantity: number;
  reason: string;
};

type Props = {
  items: Item[];
  onSubmit: (data: {
    itemId: string;
    itemName: string;
    type: MovementType;
    quantity: number;
    reason: string;
  }) => Promise<void>;
};

export function MovementForm({ items, onSubmit }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [form, setForm] = useState<MovementFormState>({
    itemId: "",
    type: "",
    quantity: 1,
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.itemId || !form.type || form.quantity <= 0) return;

    const item = items.find((i) => i.id === form.itemId);

    try {
      setSubmitting(true);

      await onSubmit({
        itemId: form.itemId,
        itemName: item?.name || "Unknown",
        type: form.type,
        quantity: form.quantity,
        reason: form.reason,
      });

      setForm({
        itemId: "",
        type: "",
        quantity: 1,
        reason: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <div className="flex justify-between">
      <Title title="Registrar Movimientos" />
      {" "}
      <div className="flex items-center justify-end mb-3">
        <Button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm"
        >
          {collapsed ? "Abrir Formulario de Ingreso" : "Ocultar Formulario de Ingreso"}
        </Button>
      </div>
    </div>
      {!collapsed && (<form onSubmit={handleSubmit} className="flex gap-3 mb-6 flex-wrap">
        <p>Herramienta / Insumo</p>
        <ItemSelect
          items={items}
          value={form.itemId}
          onChange={(val) => setForm({ ...form, itemId: val })}
        />
        <p>Entrada / Salida</p>
        <MovementTypeSelect
          value={form.type}
          onChange={(val) => setForm({ ...form, type: val })}
        />
        <p>Cantidad</p>
        <Input
          type="number"
          min={1}
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
        />
        <p>Razón</p>
        <Input
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          placeholder="Razón"
        />

        <Button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2"
        >
          {submitting && <Spinner />}
          {submitting ? "Guardando..." : "Registrar"}
        </Button>
      </form>)}
    </>
  );
}