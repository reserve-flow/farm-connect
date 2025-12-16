"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = PropsWithChildren<
  Omit<ComponentPropsWithoutRef<"a">, "href"> & {
    to: Route;
    activeClassName?: string;
    pendingClassName?: string;
    end?: boolean;
  }
>;

export function NavLink({
  to,
  className,
  activeClassName,
  pendingClassName,
  end = false,
  children,
  ...rest
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname?.startsWith(to);

  return (
    <Link
      href={to}
      className={cn(
        className,
        isActive && activeClassName,
        !isActive && pendingClassName,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
