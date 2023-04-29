import AlertStore from '../store/AlertStore'
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

  if (!type) return null

  return (
    <div className={`py-3 px-9 bg-white rounded-xl z-10 shadow-lg text-left fixed left-10 max-w-[330px] w-screen bottom-5 text-normal ${typeAlert[type]}`}>{message}</div>
  )
}
