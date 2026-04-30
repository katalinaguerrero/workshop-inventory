import type { Item } from "@/types/item";
import { db } from "@/lib/firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const itemsRef = collection(db, "items");

export async function getItems() {
  const snapshot = await getDocs(collection(db, "items"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
// GET BY ID
export async function getItemById(id: string): Promise<Item | null> {
  const ref = doc(db, "items", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  } as Item;
}
// CREATE
export async function createItem(item: Omit<Item, "id">) {
  return await addDoc(itemsRef, item);
}

// UPDATE
export async function updateItem(id: string, data: Partial<Item>) {
  const ref = doc(db, "items", id);
  return await updateDoc(ref, data);
}

// DELETE
export async function deleteItem(id: string) {
  const ref = doc(db, "items", id);
  return await deleteDoc(ref);
}
