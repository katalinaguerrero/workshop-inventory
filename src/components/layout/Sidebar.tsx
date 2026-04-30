import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background p-6">

      <h2 className="text-xl font-bold mb-8">
        Workshop
      </h2>

      <nav className="flex flex-col gap-2">

        <Link
          href="/dashboard"
          className="rounded px-3 py-2 hover:bg-muted"
        >
          Dashboard
        </Link>

        <Link
          href="/items"
          className="rounded px-3 py-2 hover:bg-muted"
        >
          Items
        </Link>

        <Link
          href="/movements"
          className="rounded px-3 py-2 hover:bg-muted"
        >
          Movements
        </Link>

      </nav>
    </aside>
  );
}