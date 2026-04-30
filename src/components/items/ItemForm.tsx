"use client";

import { useEffect, useRef, useState } from "react";
import type { Item, ItemSpecification } from "@/types/item";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ItemTypeSelect } from "./ItemTypeSelect";

type Props = {
  initialData?: Omit<Item, "id">;
  onSubmit: (data: Omit<Item, "id">) => void;
};

export function ItemForm({ initialData, onSubmit }: Props) {
  const hydrated = useRef(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [type, setType] = useState<Item["type"] | "">("");
  const [specifications, setSpecifications] = useState<ItemSpecification[]>([]);

  // 🔥 SOLO UNA VEZ
  useEffect(() => {
    if (!initialData) return;
    if (hydrated.current) return;

    setName(initialData.name);
    setStock(initialData.stock);
    setType(initialData.type);
    setDescription(initialData.description ?? "");
    setSpecifications(initialData.specifications ?? []);

    hydrated.current = true;
  }, [initialData]);

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
      description,
      specifications,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p>Nombre</p>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre"  />
      <p>Stock Inicial</p>
      <Input
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        />
      <p>Descripción</p>
      <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
      <p>Tipo</p>
      <ItemTypeSelect value={type} onChange={setType} />

      <div>
        <div className="flex justify-between">
          <h3>Especificaciones</h3>
          <Button type="button" onClick={addSpec}>
            Agregar Especificaciones
          </Button>
        </div>

        {specifications.map((s, i) => (
          <div key={i} className="flex gap-2 mt-5">
            <Input
              value={s.key}
              onChange={(e) =>
                updateSpec(i, "key", e.target.value)
              }
              placeholder="Nombre espeficicación"
            />

            <Input
              value={s.value}
              onChange={(e) =>
                updateSpec(i, "value", e.target.value)
              }
              placeholder="Valor"
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