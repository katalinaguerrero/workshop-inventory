export type Movement = {
  id: string;
  itemId: string;
  type: "IN" | "OUT";
  quantity: number;
  date: Date;
  reason?: string;
};