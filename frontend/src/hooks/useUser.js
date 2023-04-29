import { useState } from 'react'
import fetchGetUser from '../services/fetchGetUser'
import fetchLogin from '../services/fetchLogin'
import UserStore from '../store/UserStore'
import { shallow } from 'zustand/shallow'
import AlertStore from '../store/AlertStore'
import fetchLogout from '../services/fetchLogout'
import { useNavigate } from 'react-router-dom'
import fetchSignUp from '../services/fetchSignUp'

export default function useUser () {
  const { setUser, resetUser } = UserStore((state) => state, shallow)
  const { successAlert, errorAlert } = AlertStore((state) => state, shallow)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signUp = async () => {
    setLoading(true)
    const response = await fetchSignUp()
    setLoading(false)
    const message = response.message
    if (response.error) {
      errorAlert(message)
      return
    }
    successAlert(message)
    navigate('/auth/login')
  }

  const logIn = async (data) => {
    setLoading(true)
    const response = await fetchLogin(data)
    const message = response.message
    if (response.error) {
      setLoading(false)
      errorAlert(message)
      return
    }

    const newUser = await fetchGetUser()
    const newMessage = newUser.message

    if (newUser.error) {
      setLoading(false)
      errorAlert(newMessage)
      return
    }

    setUser(newUser)
    setLoading(false)
    successAlert(newMessage)
    navigate('/')
  }

  const logOut = async () => {
    setLoading(true)
    const response = await fetchLogout()
    const message = response.message
    if (response.error) {
      setLoading(false)
      errorAlert(message)
      return
    }

    setLoading(false)
    resetUser()
    navigate('/auth/login')
  }

  return {
    logIn,
    logOut,
    loading,
    signUp
  }
}
