import { create } from 'zustand'

export const useStore = create((set, get) => ({
  token: localStorage.getItem('galaxy_token') || null,
  me: null,
  allUsers: [],
  friends: [],

  setToken: (token) => {
    localStorage.setItem('galaxy_token', token)
    set({ token })
  },
  logout: () => {
    localStorage.removeItem('galaxy_token')
    set({ token: null, me: null, friends: [] })
  },
  setMe:       (me)      => set({ me }),
  setAllUsers: (users)   => set({ allUsers: users }),
  setFriends:  (friends) => set({ friends }),
}))
