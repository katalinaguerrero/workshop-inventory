"use client";

type Props = {
  value: "IN" | "OUT" | "";
  onChange: (value: "IN" | "OUT") => void;
};

export function MovementTypeSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as "IN" | "OUT")}
      className="border border-black rounded px-3 py-2 w-full"
    >
      <option value="">Selecciona tipo de Movimiento</option>
      <option value="IN">Entrada</option>
      <option value="OUT">Salida</option>
    </select>
  );
}