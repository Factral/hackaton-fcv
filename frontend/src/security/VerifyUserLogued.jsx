import UserStore from '../store/UserStore'
import { shallow } from 'zustand/shallow'
import { Navigate } from 'react-router-dom'

export default function VerifyUserLogued ({ children, userNeedLogued = true }) {
  const { user } = UserStore(store => store, shallow)

  // if (!userNeedLogued && user.role) return <Navigate to='/' />

  // if (userNeedLogued && !user.role) return <Navigate to='/auth/login' />

  return children
}
