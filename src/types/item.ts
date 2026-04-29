export const ITEM_TYPES = [
  { value: "tool", label: "Herramienta" },
  { value: "supply", label: "Insumo" },
] as const;

export type ItemType = typeof ITEM_TYPES[number]["value"];

export type ItemSpecification = {
  key: string;
  value: string;
};

export type Item = {
  id: string;
  name: string;
  stock: number;
  type: ItemType;
  imgUrl?: string;
  specifications?: ItemSpecification[];
};