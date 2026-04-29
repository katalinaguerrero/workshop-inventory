import type { Movement } from "@/types/movement";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
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
export async function createMovement(movement: Omit<Movement, "id">) {
  return await addDoc(movementsRef, movement);
}