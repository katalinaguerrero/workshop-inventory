"use client";

import { useCallback, useEffect, useState } from "react";
import type { Movement } from "@/types/movement";
import { getMovements, createMovement } from "@/services/movements.service";

export function useMovements() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // fetch centralizado
  const loadMovements = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMovements();
      setMovements(data);
    } finally {
      setLoading(false);
    }
  }, []);

  // init
  useEffect(() => {
    loadMovements();
  }, [loadMovements]);

  // create + refresh
  const addMovement = async (movement: Omit<Movement, "id" | "createdAt">) => {
    const id = await createMovement(movement);

    setMovements((prev) => [
      {
        id,
        ...movement,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  };

  return {
    movements,
    loading,
    reload: loadMovements,
    addMovement,
  };
}
