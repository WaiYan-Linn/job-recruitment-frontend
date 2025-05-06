import Sidebar from "@/components/layout/Sidebar";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Sidebar />
      <main className="flex-1 md:ml-64 pt-16">{children}</main>
    </div>
  );
}
