import AlertStore from '../store/AlertStore'
import { Transition } from '@headlessui/react'
import { shallow } from 'zustand/shallow'

export default function AlertComponent () {
  const { alert } = AlertStore(store => store, shallow)
  const { type, message } = alert
  const typeAlert = {
    success: 'text-main-green-600',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  }

  return (
    <Transition
      show={Boolean(type)}
      enter='transition duration-300 ease-out'
      enterFrom='opacity-0 -top-10'
      enterTo='opacity-100 top-10'
      leave='transition ease-in duration-300'
      leaveFrom='opacity-100 -top-10'
      leaveTo='opacity-0 top-10'
    >
      <div className={`py-5 px-12 bg-white rounded-xl z-10 shadow-xl text-left fixed w-fit top-10 left-1/2 -translate-x-1/2 max-w-[330px] text-lg font-semibold ${typeAlert[type]}`}>{message}</div>
    </Transition>
  )
}
