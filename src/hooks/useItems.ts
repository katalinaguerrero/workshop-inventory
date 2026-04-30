"use client";

import { useCallback, useEffect, useState } from "react";
import type { Item } from "@/types/item";
import {
  getItems,
  createItem,
  deleteItem,
  updateItem,
} from "@/services/items.service";

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // LOAD
  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getItems();
      setItems(data as Item[]);
    } catch (err) {
      console.error("❌ ERROR GETTING ITEMS:", err);
      setError("Error loading items");
    } finally {
      setLoading(false);
    }
  }, []);

  // INIT
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // CREATE
  const addItem = async (item: Omit<Item, "id">) => {
    await createItem(item);
    await loadItems();
  };

  // DELETE
  const removeItem = async (id: string) => {
    await deleteItem(id);
    await loadItems();
  };

  // UPDATE
  const updateItemById = async (id: string, data: Partial<Item>) => {
    await updateItem(id, data);
    await loadItems();
  };

  return {
    items,
    loading,
    error,
    reload: loadItems,
    addItem,
    removeItem,
    updateItemById,
  };
}