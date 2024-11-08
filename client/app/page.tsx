'use client'
import ThemeToggle from "@/components/core/toggle-theme/ToggleTheme";
import { useEffect, useState } from "react";

export default function Home() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="h-screen dark:bg-black dark:text-white">
      <ThemeToggle />
    </div>
  );
}
