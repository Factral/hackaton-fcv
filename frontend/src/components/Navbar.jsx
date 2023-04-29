import { navbarItems } from '../data/navbarItems';

export default function Navbar () {
  return (
    <nav>
      <ul>
        {navbarItems.map(({icon, label}) => (
          <li key={label}>
            <a href="#">
              {icon}
              <span>{label}</span>
            </a>
          </li>
        ))}
        </ul>
        </nav>
  )
}