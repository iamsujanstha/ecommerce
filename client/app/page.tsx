'use client'
import ThemeToggle from "@/components/core/toggle-theme/ToggleTheme";

export default function Home() {
  return (
    <div className="h-screen dark:bg-black dark:text-white">
      <ThemeToggle />
    </div>
  );
}
