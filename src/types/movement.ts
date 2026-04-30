export type MovementType = "IN" | "OUT";

export type Movement = {
  id: string;
  itemId: string;
  itemName?: string;
  reason?: string;
  type: MovementType;
  quantity: number;
  createdAt: number;
};