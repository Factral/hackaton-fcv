import UserStore from '../store/UserStore'
import { shallow } from 'zustand/shallow'

export default function Message ({ message }) {
  const { user } = UserStore(store => store, shallow)
  console.log({ user })
  const { userId, fecha, mensaje, hora, name } = message
  const isMyMessage = userId === user.id
  return (
    <div className={`flex items-end justify-between rounded-xl gap-4 w-fit min-w-[250px] max-w-xl p-5 ${isMyMessage ? 'my-class' : 'other-class'}`}>
      <div className=''>
        <p className='font-medium opacity-50'>{name}</p>
        <p className='text-lg text-main-blue-100'>{mensaje}</p>
      </div>
      <p className='text-sm min-w-fit text-main-blue-100'>{hora}</p>
    </div>
  )
}
