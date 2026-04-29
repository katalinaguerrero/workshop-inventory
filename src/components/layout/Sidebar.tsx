import Link from "next/link";

export default function Sidebar() {
  return (
    <aside style={{ width: 220, padding: 20 }}>
      <h2>Workshop</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/items">Items</Link>
        <Link href="/movements">Movements</Link>
      </nav>
    </aside>
  );
}