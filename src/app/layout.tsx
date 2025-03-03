// app/layout.tsx
import "@/app/globals.css";
import { AuthProvider } from "@/model/providers/AuthContext";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { ConditionalFooter } from "@/app/ConditionalFooter";
import { ClientOnly } from "@/components/shared/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <AuthProvider>
            <ClientOnly>
              <Header />
              <main className="flex-1">{children}</main>
              <ConditionalFooter />
            </ClientOnly>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
