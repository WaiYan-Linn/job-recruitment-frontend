// app/(auth)/layout.tsx
import "@/app/globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <main className="flex-1">{children}</main>
    </div>
  );
}
