export const routes: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/items": "Lista de Items",
  "/items/new": "Agregar Item",
  "/movements": "Movimientos",
};

export const getRouteTitle = (pathname: string) => {
  if (pathname.startsWith("/items/") && pathname.endsWith("/edit")) {
    return "Editar Item";
  }

  if (pathname.startsWith("/items/")) {
    return "Detalle Item";
  }

  return routes[pathname] || "Inventario Industrial";
};
