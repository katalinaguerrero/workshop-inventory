"use client";

import { ITEM_TYPES, type ItemType } from "@/types/item";
type Props = {
  value: ItemType | "";
  onChange: (value: ItemType) => void;
};

export function ItemTypeSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => {
        const val = e.target.value as ItemType;
        onChange(val);
      }}
      className="border rounded px-3 py-2 w-full"
    >
      <option value="">Selecciona tipo</option>

      {ITEM_TYPES.map((t) => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
  );
}