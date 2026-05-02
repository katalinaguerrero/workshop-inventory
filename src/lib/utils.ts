import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMovementLabel = (type: "IN" | "OUT" | string) => {
  const normalized = type.toUpperCase();

  if (normalized === "IN") return "Entrada";
  if (normalized === "OUT") return "Salida";

  return type;
};
export const getItemTypeLabel = (type: "tool" | "supply" | string) => {
  const normalized = type.toUpperCase();
  if (normalized === "TOOL") return "Herramienta";
  if (normalized === "SUPPLY") return "Insumos";

  return type;
};