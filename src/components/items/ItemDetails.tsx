import Image from "next/image";
import { Item } from "@/types/item";

export function ItemDetails({ item }: { item: Item }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{item.name}</h2>

      {/* IMAGE */}
      {item.imgUrl && (
        <div className="relative w-48 h-48">
          <Image
            src={item.imgUrl}
            alt={item.name}
            fill
            className="object-cover rounded border"
          />
        </div>
      )}

      <p>Stock: {item.stock}</p>
      <p>Tipo: {item.type}</p>

      <h3 className="font-semibold mt-4">Especificaciones</h3>

      <ul className="list-disc ml-5">
        {item.specifications?.map((spec, index) => (
          <li key={index}>
            {spec.key}: {spec.value}
          </li>
        ))}
      </ul>
    </div>
  );
}