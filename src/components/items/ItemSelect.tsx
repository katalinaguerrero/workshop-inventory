"use client";

import type { Item } from "@/types/item";

type Props = {
  items: Item[];
  value: string;
  onChange: (value: string) => void;
};

export function ItemSelect({
  items,
  value,
  onChange,
}: Props) {
  return (
    <select
      className="border border-black rounded px-3 py-2 w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Selecciona item</option>

      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name} ({item.stock})
        </option>
      ))}
    </select>
  );
}