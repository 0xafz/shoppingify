import { StoreSlice } from "."

export type CartSlice = {
  showSidePane: boolean
  sidePaneType: "create-list" | "item-info" | "create-item" | null
  setSidePaneType: (type: CartSlice["sidePaneType"]) => void
  toggleSidePane: () => void
}
export const createCartSlice: StoreSlice<CartSlice> = (set, get) => ({
  sidePaneType: "create-item",
  showSidePane: false,
  setSidePaneType: (type) => {
    set({ sidePaneType: type, showSidePane: true })
  },
  toggleSidePane: () => {
    set({ showSidePane: !get().showSidePane })
  },
})
