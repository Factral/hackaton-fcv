import { useState } from 'react'
import { Add } from './Icons'
import IconButton from './IconButton'

export default function AddMedicineButton () {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className=''>
      <IconButton onClick={handleOpen} className='bg-main-green-600 z-20 text-white rounded-full p-2 fixed bottom-20 right-5 shadow-2xl' icon={<Add />} />
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-[calc(100%-64px)] z-10 bg-black bg-opacity-60' />
      )}
      {isOpen && (
        <div className='fixed bottom-32 right-5 z-20'>
          <div className='relative flex flex-col gap-2 w-full'>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-white'>Añadir</p>
              <IconButton className='bg-main-white-200 text-gray-500 rounded-full p-2 shadow-2xl hover:bg-main-green-500 duration-200' icon={<Add />} />
            </div>
          </div>
        </div>

      )}
    </div>
  )
}
