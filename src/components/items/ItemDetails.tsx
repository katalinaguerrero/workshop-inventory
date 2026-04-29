import { Item } from "@/types/item";

export function ItemDetails({ item }: { item: Item }) {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Stock: {item.stock}</p>
      <p>Tipo: {item.type}</p>

      <h3>Especificaciones</h3>
      <ul>
        {item.specifications?.map((spec, index) => (
          <li key={index}>
            {spec.key}: {spec.value}
          </li>
        ))}
      </ul>
    </div>
  );
}