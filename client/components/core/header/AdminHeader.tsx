'use client'
import { useLogout } from '@/app/auth/auth.query'
import Sidebar from '@/components/core/sidebar/Sidebar'
import { Button } from '@/components/ui/Button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import { adminSidebarMenuItems } from '@/config'
import { MenuIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

const AdminHeader = () => {
  const { mutate: logout } = useLogout();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    logout();
    router.push('/auth/login')
  }, [logout, router])

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
      <Button onClick={handleLogout}>Logout</Button>
    </header>
  )
}

export default AdminHeader