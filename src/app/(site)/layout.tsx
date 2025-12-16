import type { ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      {children}
      <BottomNav />
    </div>
  );
}
