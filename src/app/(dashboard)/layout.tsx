import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      {/* TOP NAVBAR */}
      <Navbar />

      {/* BODY */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}