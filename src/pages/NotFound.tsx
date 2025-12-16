"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col gap-8 items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl">404</h1>
      <p className="mb-4 text-xl text-gray-600">ببخشید صفحه موردنظر یافت نشد</p>
      <a href="/" className="text-blue-500 hover:text-blue-700 font-bold">
        بازگشت به خانه
      </a>
    </div>
  );
};

export default NotFound;
