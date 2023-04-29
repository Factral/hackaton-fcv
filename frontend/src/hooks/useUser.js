import fetchLogin from '../services/fetchLogin'
import UserStore from '../store/UserStore'
import { shallow } from 'zustand/shallow'

export default function useUser () {
  const { setUser, resetUser } = UserStore((state) => state, shallow)

  const logIn = async ({ email, password }) => {
    const response = await fetchLogin({ email, password })
  }

  return {
    logIn
  }
}
