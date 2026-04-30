import type { Movement } from "@/types/movement";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

import { getMovementLabel } from "@/lib/utils";

type Props = {
  movements: Movement[];
};

export function MovementTable({ movements }: Props) {
  if (movements.length === 0) {
    return (
      <div className="border rounded-xl p-6">
        No hay movimientos
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Fecha</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {movements.map((movement) => (
          <TableRow key={movement.id}>
            <TableCell>{movement.itemName}</TableCell>

            <TableCell>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  movement.type === "IN"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {getMovementLabel(movement.type)}
              </span>
            </TableCell>

            <TableCell>{movement.quantity}</TableCell>

            <TableCell>
              {new Date(movement.createdAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}