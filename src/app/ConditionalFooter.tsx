// app/ConditionalFooter.tsx
"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  // Define your condition to show/hide the footer
  const showFooter =
    !pathname.startsWith("/anonymous") &&
    !pathname.startsWith("/employer") &&
    !pathname.startsWith("/jobs"); // example condition

  return showFooter ? <Footer /> : null;
}
