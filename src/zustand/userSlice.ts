import { IUser } from "~/types"
import { StoreSlice } from "."

export type UserSlice = {
  user: IUser
  setUser: (user: IUser) => void
  clearStore: () => void
}
export const createUserSlice: StoreSlice<UserSlice> = (set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearStore: () =>
    set({
      items: {},
      lists: [],
      user: null,
    }),
})
