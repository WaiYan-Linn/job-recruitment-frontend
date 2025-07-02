// app/layout.tsx
import "@/app/globals.css";
import { AuthProvider } from "@/model/providers/AuthContext";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { ConditionalFooter } from "@/app/ConditionalFooter";
import { ClientOnly } from "@/components/shared/ThemeProvider";
import { cookies } from "next/headers";
import { cookieStorage } from "@/model/stores/cookie-store";
import { Toaster } from "react-hot-toast";
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
              <Toaster
                position="top-center"
                containerStyle={{
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "linear-gradient(135deg, #1e293b, #0f172a)",
                    color: "#e2e8f0",
                    fontSize: "16px",
                    padding: "20px 30px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                    border: "1px solid #334155",
                    fontWeight: 500,
                    backdropFilter: "blur(8px)",
                  },
                  success: {
                    iconTheme: {
                      primary: "#10b981",
                      secondary: "#ecfdf5",
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: "#ef4444",
                      secondary: "#fee2e2",
                    },
                  },
                }}
              />
              <main className="flex-1">{children}</main>
              <ConditionalFooter />
            </ClientOnly>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
