import { create } from 'zustand'

const userInitial = {
  name: null,
  email: null,
  gender: null,
  phone: null,
  role: null,
  birthdate: null
}

const UserStore = create((set) => ({
  user: userInitial,

  setUser: (newUser) => set({ user: newUser }),
  resetUser: () => set({ user: userInitial })
}))

export default UserStore
