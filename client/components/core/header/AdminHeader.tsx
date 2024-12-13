import Sidebar from '@/components/core/sidebar/Sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { adminSidebarMenuItems } from '@/config'
import { MenuIcon } from 'lucide-react'
import React from 'react'

const AdminHeader = () => {
  return (
    <header className='w-full flex justify-between bg-white p-4'>
      <Sheet>
        <SheetTrigger>
          <Button size='icon' className='cursor-pointer lg:hidden'>
            <MenuIcon className='' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <Sidebar menuItems={adminSidebarMenuItems} />
        </SheetContent>
      </Sheet>
      <Button>Logout</Button>
    </header>
  )
}

export default AdminHeader