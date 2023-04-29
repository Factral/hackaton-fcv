import { Chat, CheckList, Progres, SearchDrugs } from '../components/Icons'

export const navbarItems = [
  {
    icon: <CheckList />,
    label: 'Formula',
    path: '/'
  },
  {
    icon: <SearchDrugs />,
    label: 'Medicamentos',
    path: '/medicamentos'
  },
  {
    icon: <Chat />,
    label: 'Chat',
    path: '/chat'
  },
  {
    icon: <Progres />,
    label: 'Progreso',
    path: '/progreso'
  }
]
