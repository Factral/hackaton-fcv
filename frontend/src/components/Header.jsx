import useUser from '../hooks/useUser'
import Dropdown, { DropdownItem } from './Dropdown'
import { Adjustment, ArrowLeft, ArrowRight, Calendar, LogOut, User } from './Icons'

export default function Header () {
  const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
  const [day, month] = date.split(' ')
  const dayFormated = day.split(',')[0]
  const dateFormated = `${dayFormated} ${month}`
  const { logOut } = useUser()

  return (
    <header className='sticky top-0 z-10 bg-white shadow-sm px-6 py-4 items-center text-main-green-600'>
      <div className='flex max-w-5xl justify-between w-full m-auto'>
        <Calendar />
        <div className='flex items-center gap-3'>
          <ArrowLeft />
          <h1 className='text-2xl text-gray-500 capitalize'>{dateFormated}</h1>
          <ArrowRight />
        </div>
        <Dropdown icon={<Adjustment />} title='ajustes'>
          <DropdownItem icon={<User />}>
            Perfíl
          </DropdownItem>
          <DropdownItem onClick={logOut} icon={<LogOut />}>
            Cerrar sesión
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  )
}
