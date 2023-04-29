import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Adjustment, LogOut, User } from './Icons'

export default function Dropdown ({ title, icon, className, children }) {
  return (
    <div className=''>
      <Menu as='div' className='relative inline-block'>
        <div>
          <Menu.Button className='w-full justify-center text-main-green-600 hover:bg-gray-300 rounded-[50%] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            <Adjustment />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              {children}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
export function DropdownItem ({ className, onClick, children, icon }) {
  return (
    <Menu.Item>
      <div
        className={`flex w-full gap-2 items-center text-gray-900 rounded-md p-2 text-sm font-medium hover:bg-main-green-600 hover:text-white duration-200
          ${className}`}
      >
        <div className='flex items-center'>
          {icon && <div className='mr-3'>{icon}</div>}
          {children}
        </div>
      </div>
    </Menu.Item>
  )
}
