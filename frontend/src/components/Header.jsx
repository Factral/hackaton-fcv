import DropMenu from './DropMenu'
import { Adjustement, ArrowLeft, ArrowRight, Calendar } from './Icons'

export default function Header () {
  const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
  console.log(date)
  const [day, month] = date.split(' ')
  const dayFormated = day.split(',')[0]
  const dateFormated = `${dayFormated} ${month}`
  return (
    <header className='sticky top-0 flex justify-between z-10 bg-white shadow-sm px-6 py-4 items-center text-main-green-600'>
      <Calendar />
      <div className='flex items-center gap-3'>
        <ArrowLeft />
        <h1 className='text-2xl text-gray-500 capitalize'>{dateFormated}</h1>
        <ArrowRight />
      </div>
      <DropMenu />
    </header>
  )
}
