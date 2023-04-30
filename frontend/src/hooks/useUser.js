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

  const signUp = async (data) => {
    setLoading(true)
    const response = await fetchSignUp(data)
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
    const { rebember } = data
    const message = response.message
    console.log({ message })
    if (response.error) {
      setLoading(false)
      errorAlert(message)
      return
    }

    if (rebember) localStorage.setItem('user', JSON.stringify(message))
    setUser({ role: message })
    setLoading(false)
    navigate('/')
  }

  const getUser = async () => {
    const userLocal = localStorage.getItem('user')
    setLoading(true)
  
    const response = await fetchGetUser()
    const message = response.message
    console.log({ message })
    if (response.error) {
      setLoading(false)
      errorAlert(message)
      return
    }

    if (userLocal) localStorage.setItem('user', JSON.stringify(message))
    setLoading(false)
    setUser(message)
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
    signUp,
    getUser
  }
}
