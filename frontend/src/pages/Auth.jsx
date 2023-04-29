import { Outlet } from 'react-router-dom'
export default function Auth () {
  return (
    <div className='h-screen w-screen bg-gradient-to-tr from-main-white-100 to-main-white-200'>
      <div className='h-screen w-screen bg-gradient-to-t to-gradient-green-100 from-gradient-green-200 grid place-items-center'>
        <div className='max-h-[86vh] w-[90%] items-center flex flex-col gap-10'>
          <h1 className='font-bold text-6xl text-white drop-shadow-lg main-shadow-text'>HEALTHER</h1>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
