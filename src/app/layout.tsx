// app/layout.tsx
import "@/app/globals.css";
import { AuthProvider } from "@/model/providers/AuthContext";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { ConditionalFooter } from "@/app/ConditionalFooter";
import { ClientOnly } from "@/components/shared/ThemeProvider";
import { cookies } from "next/headers";
import { cookieStorage } from "@/model/stores/cookie-store";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialAccessToken = "";

  // Retrieve authentication token from cookies (server-side)
  const cookieStore = cookies();
  const jobRecruitCookie = (await cookieStore).get("job.recruit")?.value;

  if (jobRecruitCookie) {
    try {
      const parsedCookie = JSON.parse(decodeURIComponent(jobRecruitCookie));
      initialAccessToken =
        parsedCookie?.state?.authentication?.accessToken || "";
    } catch (error) {
      console.error("Error parsing job.recruit cookie:", error);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <AuthProvider initialAccessToken={initialAccessToken}>
        <body className="min-h-screen bg-background font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <ClientOnly>
              <Header />
              <main className="flex-1">{children}</main>
              <ConditionalFooter />
            </ClientOnly>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
