"use client";

import type { Route } from "next";
import { Home, Search, ShoppingBag, BookOpen, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems: { path: Route; icon: typeof Home; label: string }[] = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/search", icon: Search, label: "Search" },
  { path: "/reserve", icon: ShoppingBag, label: "Reserve" },
  { path: "/blog", icon: BookOpen, label: "Blog" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-elev bg-background/95 backdrop-blur-sm pb-safe-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end
            className="flex flex-col items-center justify-center gap-1 flex-1 h-full text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
