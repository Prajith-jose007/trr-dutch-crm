"use client";

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { AuthProvider } from "./context/auth-context"
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
        {children}
        <ThemeCustomizer />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
