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
      enter='transition-opacity duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-300'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className={`py-3 px-9 bg-white rounded-xl z-10 shadow-lg text-left fixed w-fit left-5 max-w-[330px] bottom-5 text-normal font-semibold ${typeAlert[type]}`}>{message}</div>
    </Transition>
  )
}
