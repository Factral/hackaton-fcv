import { CheckList } from '../Icons'
import './styles.css'

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <CheckList/>
        </li>
      </ul>
    </nav>
  )
}
