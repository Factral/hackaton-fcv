import { MY_ID } from '../constants/magicStrings'

export default function Message ({ message }) {
  const { userId, fecha, mensaje, hora } = message
  const isMyMessage = userId === MY_ID
  return (
    <div className={`flex items-end justify-between rounded-xl gap-4 w-fit min-w-[250px] max-w-xl p-5 ${isMyMessage ? 'my-class' : 'other-class'}`}>
      <div className=''>
        <p className='text-sm text-main-blue-100'>{fecha}</p>
        <p className='text-lg text-main-blue-100'>{mensaje}</p>
      </div>
      <p className='text-sm min-w-fit text-main-blue-100'>{hora}</p>
    </div>
  )
}
