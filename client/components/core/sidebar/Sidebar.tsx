'use client'
import Icon from '@/components/core/icon/Icon';
import { AdminSidebarMenuItems } from '@/config';
import { getIconFromPath } from '@/utils/get-icons';
import { Icons } from '@/utils/icons.config';
import clsx from 'clsx';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type MenuItemsProps = {
  menuItems: AdminSidebarMenuItems[];
};

const Sidebar = ({ menuItems }: MenuItemsProps) => {
  const [selected, setSelected] = useState('');
  // console.log(window.location.pathname)
  // console.log(params)

  const handleItemClick = (item: AdminSidebarMenuItems) => {
    return () => {
      if (!item) return;
      setSelected(item.path);
      redirect(item.path)
    };
  }

  useEffect(() => {
    if (window !== undefined) {
      setSelected(window.location.pathname)
    }
  }, [])

  return (
    <section>
      <div className="flex gap-4 p-4">
        <span>
          <Icons.adminPanel size="30" />
        </span>
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <ul className="mt-8" >
        {menuItems?.map((item) => {
          const isSelected = selected === item.path;
          return (
            <li
              key={item.id}
              onClick={handleItemClick(item)}
              className={clsx("py-2 flex gap-4 items-center cursor-pointer hover:bg-slate-200", { 'bg-slate-200': isSelected })}
            >
              <Icon icon={getIconFromPath[item.icon]} size={24} className="ml-4" />
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;
