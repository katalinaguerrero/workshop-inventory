"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import type { Item } from "@/types/item";

type Props = {
  items: Item[];
};

export function ItemTable({ items }: Props) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Tipo</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-center py-6 text-muted-foreground"
            >
              No hay items
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => router.push(`/items/${item.id}`)}
              className="cursor-pointer hover:bg-muted/50 transition"
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}