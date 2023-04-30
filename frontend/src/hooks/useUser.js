import { useState } from 'react'
import fetchLogin from '../services/fetchLogin'
import UserStore from '../store/UserStore'
import { shallow } from 'zustand/shallow'
import AlertStore from '../store/AlertStore'
import fetchLogout from '../services/fetchLogout'
import { useNavigate } from 'react-router-dom'
import fetchSignUp from '../services/fetchSignUp'
import fetchGetTreatmetns from '../services/fetchGetTreatments'

export default function useUser () {
  const { setUser, resetUser } = UserStore((state) => state, shallow)
  const { successAlert, errorAlert, infoAlert } = AlertStore((state) => state, shallow)
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
    const { remember } = data
    const message = response.message
    console.log({ message })
    if (response.error) {
      setLoading(false)
      errorAlert(message)
      return
    }

    if (remember) localStorage.setItem('user', JSON.stringify(response.user))

    setUser(response.user)
    setLoading(false)
    successAlert('Bienvenido ' + response.user.name)
    navigate('/home')
  }

  const getTreatments = async () => {
    setLoading(true)
    const response = await fetchGetTreatmetns()
    setLoading(false)
    console.log({ response })
    return response
  }

  const logOut = async () => {
    setLoading(true)
    const response = await fetchLogout()
    console.log({ response })
    const message = response?.message || 'Sesión terminada'
    if (response?.error) {
      setLoading(false)
      errorAlert(message)
      return
    }
    localStorage.removeItem('user')
    infoAlert(message)
    setLoading(false)
    resetUser()
    navigate('/auth/login')
  }

  return {
    logIn,
    logOut,
    loading,
    signUp,
    getTreatments
  }
}
