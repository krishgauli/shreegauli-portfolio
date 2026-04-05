"use client";

import type { ReactNode } from "react";
import { SitePreferencesProvider } from "@/components/SitePreferencesProvider";
import { AuthProvider } from "@/components/AuthProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SitePreferencesProvider>
      <AuthProvider>{children}</AuthProvider>
    </SitePreferencesProvider>
  );
}
