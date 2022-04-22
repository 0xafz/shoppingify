import { Action, IShoppingItem } from "~/types"
import { StoreSlice } from "."
import produce from "immer"

export type DrawerActions =
  | Action<"drawer:set", "create-list" | "item-info" | "create-item">
  | Action<"drawer:set-info-item", IShoppingItem>
  | Action<"drawer:hide">
  | Action<"drawer:toggle">

export type DrawerSlice = {
  showRightSideDrawer: boolean
  rightSideDrawerType: "create-list" | "item-info" | "create-item"
  itemInDrawer: IShoppingItem
  dispatchDrawer: (args: DrawerActions) => void
}
const freezeBodyScroll = () => {
  if (document.body) {
    document.body.classList.add("no-scroll")
  }
}
const unFreezeBodyScroll = () => {
  if (document.body) {
    document.body.classList.remove("no-scroll")
  }
}
const drawerReducer = (state: DrawerSlice, action: DrawerActions) => {
  switch (action.type) {
    case "drawer:set":
      freezeBodyScroll()
      state.rightSideDrawerType = action.payload
      state.showRightSideDrawer = true
      break
    case "drawer:set-info-item":
      freezeBodyScroll()
      state.itemInDrawer = action.payload
      state.rightSideDrawerType = "item-info"
      state.showRightSideDrawer = true
      break
    case "drawer:hide":
      state.showRightSideDrawer = false
      unFreezeBodyScroll()
      break
    case "drawer:toggle":
      if (state.showRightSideDrawer) {
        unFreezeBodyScroll()
      } else {
        freezeBodyScroll()
      }
      state.showRightSideDrawer = !state.showRightSideDrawer
      break
    default:
      break
  }
}
export const createDrawerSlice: StoreSlice<DrawerSlice> = (set, get) => ({
  rightSideDrawerType: "create-list",
  showRightSideDrawer: false,
  itemInDrawer: null,
  dispatchDrawer: (args) => set(produce((state) => drawerReducer(state, args))),
})
