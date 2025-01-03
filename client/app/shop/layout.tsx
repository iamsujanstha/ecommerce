import ShopHeader from "@/components/core/header/ShopHeader";
import ShopSidebar from "@/components/core/sidebar/ShopSidebar";
import { SidebarProvider } from "@/providers/shopFilterContext";
import React from "react";

const ShopLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="h-screen w-full flex flex-col">
        <ShopHeader />
        <section className="flex flex-1 gap-4 overflow-hidden">
          <aside className="lg:block w-80 hidden bg-gray-300 h-full overflow-y-auto">
            <ShopSidebar />
          </aside>
          <main className="flex-1 overflow-y-auto">
            {/* Pass sidebarValue to children */}
            {/* {React.isValidElement(children) &&
            React.cloneElement(children, { sidebarValue })} */}
            {children}
          </main>
        </section>
      </div>
    </SidebarProvider>
  )
}

export default ShopLayout;