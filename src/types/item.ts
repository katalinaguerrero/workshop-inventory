export type Item = {
  id: string;
  name: string;
  type: "tool" | "consumable";
  stock: number;
  status: "good" | "damaged" | "maintenance";
  imageUrl?: string;
  specs?: Record<string, string | number>;
}