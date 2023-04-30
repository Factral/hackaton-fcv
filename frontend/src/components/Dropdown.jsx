import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Dropdown ({ title, icon, className, children }) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className={className}>
        {icon}
      </Menu.Button>
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
  )
}
export function DropdownItem ({ className, onClick, children, icon }) {
  return (
    <Menu.Item>
      <div
        onClick={onClick}
        className={`cursor-pointer flex w-full gap-2 items-center text-gray-900 rounded-md p-2 text-sm font-medium hover:bg-main-green-600 hover:text-white duration-200
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
