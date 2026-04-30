import type { Movement } from "@/types/movement";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  runTransaction,
  doc,
} from "firebase/firestore";

const movementsRef = collection(db, "movements");

// GET ALL
export async function getMovements(): Promise<Movement[]> {
  const snapshot = await getDocs(movementsRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Movement[];
}

// CREATE
export async function createMovement(
  movement: Omit<Movement, "id" | "createdAt">
) {
  return await runTransaction(db, async (transaction) => {
    const itemRef = doc(db, "items", movement.itemId);
    const itemSnap = await transaction.get(itemRef);

    if (!itemSnap.exists()) {
      throw new Error("Item not found");
    }

    const item = itemSnap.data();
    const currentStock = item.stock ?? 0;

    const newStock =
      movement.type === "IN"
        ? currentStock + movement.quantity
        : currentStock - movement.quantity;

    if (newStock < 0) {
      throw new Error("Insufficient stock");
    }

    // update stock
    transaction.update(itemRef, {
      stock: newStock,
    });

    // create movement
    const movementRef = doc(collection(db, "movements"));

    transaction.set(movementRef, {
      ...movement,
      createdAt: Date.now(),
    });

    return movementRef.id;
  });
}