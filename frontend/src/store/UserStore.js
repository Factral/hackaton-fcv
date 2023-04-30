import { create } from 'zustand'

const userInitial = {
  name: null,
  email: null,
  gender: null,
  phone: null,
  role: null,
  birthdate: null
}

const userRebember = () => {
  const user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user)
  }
  return userInitial
}

const UserStore = create((set) => ({
  user: userRebember(),

  setUser: (newUser) => set({ user: newUser }),
  resetUser: () => set({ user: userInitial })
}))

export default UserStore
