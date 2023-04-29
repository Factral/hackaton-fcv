import { Link } from 'react-router-dom'
import { navbarItems } from '../data/navbarItems'

export default function NavbarMovil () {
  return (
    <nav className='bg-main-white-100 fixed w-full bottom-0 py-2 shadow-2xl'>
      <ul className='flex gap-4 justify-around text-gray-600 '>
        {navbarItems.map(({ icon, label, path }) => (
          <li key={label}>
            <Link to={path} className='flex flex-col justify-center items-center hover:text-main-green-600'>
              {icon}
              <span className='text-xs font-semibold'>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
