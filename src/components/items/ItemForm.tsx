"use client";

import { useEffect, useState } from "react";
import type { Item, ItemSpecification } from "@/types/item";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ItemTypeSelect } from "./ItemTypeSelect";

type Props = {
  initialData?: Omit<Item, "id">;
  onSubmit: (data: Omit<Item, "id">) => void;
};

export function ItemForm({ initialData, onSubmit }: Props) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [stock, setStock] = useState(initialData?.stock ?? 0);
  const [type, setType] = useState<Item["type"] | "">(
    initialData?.type ?? ""
  );
  const [specifications, setSpecifications] = useState<ItemSpecification[]>(
    initialData?.specifications ?? []
  );

  const addSpec = () => {
    setSpecifications((prev) => [...prev, { key: "", value: "" }]);
  };

  const updateSpec = (index: number, key: string, value: string) => {
    setSpecifications((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [key]: value } : s))
    );
  };

  const removeSpec = (index: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!type) return;

    onSubmit({
      name,
      stock,
      type,
      specifications,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <Input value={name} onChange={(e) => setName(e.target.value)} />

      <Input
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
      />

      <ItemTypeSelect value={type} onChange={setType} />

      {/* SPECS */}
      <div>
        <div className="flex justify-between">
          <h3>Specs</h3>
          <Button type="button" onClick={addSpec}>
            +
          </Button>
        </div>

        {specifications.map((s, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={s.key}
              onChange={(e) =>
                updateSpec(i, "key", e.target.value)
              }
            />

            <Input
              value={s.value}
              onChange={(e) =>
                updateSpec(i, "value", e.target.value)
              }
            />

            <Button type="button" onClick={() => removeSpec(i)}>
              X
            </Button>
          </div>
        ))}
      </div>

      <Button type="submit">Guardar</Button>
    </form>
  );
}