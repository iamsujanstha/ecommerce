import ShopHeader from "@/components/core/header/ShopHeader";
import ShopSidebar from "@/components/core/sidebar/ShopSidebar";
import React from "react";
const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex flex-col">
      <ShopHeader />
      <section className="flex flex-1 gap-4 overflow-hidden">
        <aside className="w-80 bg-gray-300 h-full overflow-y-auto">
          <ShopSidebar />
        </aside>
        <main className="flex-1 overflow-y-auto-auto">
          {children}
        </main>
      </section>

    </div>
  )
}

export default ShopLayout;