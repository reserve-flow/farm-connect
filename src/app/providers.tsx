"use client";

import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

function makeQueryClient() {
  return new QueryClient();
}
let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}


export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  // useEffect(() => {
  //   // Polyfill Buffer for gray-matter imports on the client
  //   void import("buffer").then(({ Buffer }) => {
  //     if (typeof window !== "undefined") {
  //       // @ts-expect-error Buffer is not part of Window typing
  //       window.Buffer = window.Buffer ?? Buffer;
  //     }
  //   });
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
