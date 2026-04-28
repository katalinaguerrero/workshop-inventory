export type User = {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;

  role: "admin" | "worker";

  createdAt?: Date;
};