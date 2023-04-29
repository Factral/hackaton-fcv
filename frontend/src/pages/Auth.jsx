import { Outlet } from 'react-router-dom'
import useCloseAlert from '../hooks/useCloseAlert'
export default function Auth () {
  useCloseAlert()
  return (
    <div className='h-screen w-screen bg-gradient-to-tr from-main-white-100 to-main-white-200 md:grid'>
      <div className='h-screen w-screen bg-gradient-to-t to-gradient-green-100 from-gradient-green-200 grid place-items-center md:w-full md:max-w-5xl md:h-fit md:py-10 md:max-h-[90vh] md:rounded-xl md:shadow-xl m-auto'>
        <div className='max-h-[86vh] w-[90%] items-center flex flex-col gap-10 md:gap-0 md:flex-row md:max-h-[500px] md:h-[80vh]'>
          <h1 className='font-bold text-6xl text-white drop-shadow-lg main-shadow-text md:w-3/4'>HEALTHER</h1>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
