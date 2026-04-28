export type AuditAction = "CREATE_ITEM" | "UPDATE_ITEM" | "DELETE_ITEM" | "IN_MOVEMENT" | "OUT_MOVEMENT";

export type AuditLog = {
  id: string;

  userId: string;
  userName: string;

  action: AuditAction;

  itemId?: string;
  itemName?: string;

  quantity?: number;

  date: Date;

  details?: string;
};