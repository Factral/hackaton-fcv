import { create } from 'zustand'

const alertInitial = { type: '', message: '' }

const AlertStore = create((set) => ({
  alert: alertInitial,

  successAlert: (message) => set({ alert: { type: 'success', message } }),
  errorAlert: (message) => set({ alert: { type: 'error', message } }),
  warningAlert: (message) => set({ alert: { type: 'warning', message } }),
  infoAlert: (message) => set({ alert: { type: 'info', message } }),
  resetAlert: () => set({ alert: alertInitial })
}))

export default AlertStore
