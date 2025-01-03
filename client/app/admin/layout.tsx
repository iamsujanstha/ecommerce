import AdminHeader from '@/components/core/header/AdminHeader'
import Sidebar from '@/components/core/sidebar/Sidebar'
import { adminSidebarMenuItems } from '@/config'
import React, { ReactNode } from 'react'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='h-screen w-full flex overflow-hidden'>
      <aside className='w-72 bg-white hidden lg:block'>
        <Sidebar menuItems={adminSidebarMenuItems} />
      </aside>
      <div className='w-full'>
        <AdminHeader />
        <main className='flex-1 p-4 bg-gray-100 h-screen overflow-y-auto'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout