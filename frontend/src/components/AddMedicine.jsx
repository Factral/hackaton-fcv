import { useState } from 'react'
import { Add, Drug } from './Icons'
import IconButton from './IconButton'

export default function AddMedicineButton () {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className=''>
      <IconButton onClick={handleOpen} className='bg-main-green-600 z-20 text-white rounded-full p-3 fixed bottom-[76px] right-2 shadow-2xl' icon={<Add size={32} />} />
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-[calc(100%-64px)] z-10 bg-black bg-opacity-60' />
      )}
      {isOpen && (
        <div className='fixed bottom-[150px] right-2 z-20 flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <p className='font-medium text-white'>Añadir</p>
            <IconButton className='bg-main-white-100 text-gray-500 p-3 duration-200' icon={<Drug size={32}/>} />
          </div>
        </div>

      )}
    </div>
  )
}
