import { shallow } from 'zustand/shallow'
import DrugStore from '../store/DrugStore'
import AlertStore from '../store/AlertStore'
import { useState } from 'react'

export default function useDrugs () {
  const {
    drugs,
    addDrug
  } = DrugStore(state => state, shallow)

  const {
    successAlert,
    errorAlert
  } = AlertStore(state => state, shallow)
  const [loading, setLoading] = useState(false)

  const addDrugToUser = async drug => {
    const response = await fetchAddDrug(drug)
    const message = response.message

    if (response.error) {
      errorAlert(message)
      return
    }

    addDrug(drug)
    successAlert(message)
  }
  return {
    drugs,
    addDrugToUser
  }
}
