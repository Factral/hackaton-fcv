import { useEffect } from 'react'
import AlertStore from '../store/AlertStore'
import { shallow } from 'zustand/shallow'

export default function useCloseAlert () {
  const { resetAlert, alert } = AlertStore(store => store, shallow)
  useEffect(() => {
    if (alert.message) {
      setTimeout(() => {
        resetAlert()
      }, 3000)
    }
    return () => {
      clearTimeout()
    }
  }, [alert])
}
