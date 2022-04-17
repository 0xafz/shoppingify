import create, { GetState, SetState } from "zustand"
import { DrawerSlice, createDrawerSlice } from "./drawerSlice"
import { ShoppingItemSlice, createShoppingItemSlice } from "./shoppingItemSlice"
import { ShoppingListSlice, createShoppingListSlice } from "./shoppingListSlice"
import { createUserSlice, UserSlice } from "./userSlice"

export type StoreState = UserSlice &
  ShoppingListSlice &
  ShoppingItemSlice &
  DrawerSlice

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T

export const useStore = create<StoreState>((set, get) => ({
  ...createUserSlice(set, get),
  ...createShoppingListSlice(set, get),
  ...createShoppingItemSlice(set, get),
  ...createDrawerSlice(set, get),
}))
