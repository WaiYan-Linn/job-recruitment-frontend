// app/layout.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/app/globals.css"; // Import Tailwind styles
import { ConditionalFooter } from "@/app/ConditionalFooter";
import { AuthProvider } from "@/model/providers/AuthContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <AuthProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <ConditionalFooter />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
