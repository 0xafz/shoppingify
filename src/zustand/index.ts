import { create } from "zustand";
import { DrawerSlice, createDrawerSlice } from "./drawerSlice";
import {
  ShoppingItemSlice,
  createShoppingItemSlice,
} from "./shoppingItemSlice";
import {
  ShoppingListSlice,
  createShoppingListSlice,
} from "./shoppingListSlice";
import { createUserSlice, UserSlice } from "./userSlice";

type RootSlice = {
  clearStore: () => void;
};

export type StoreState = UserSlice &
  ShoppingListSlice &
  ShoppingItemSlice &
  DrawerSlice &
  RootSlice;

export const useStore = create<StoreState>()((setState, ...a) => ({
  ...createUserSlice(setState, ...a),
  ...createShoppingListSlice(setState, ...a),
  ...createShoppingItemSlice(setState, ...a),
  ...createDrawerSlice(setState, ...a),
  clearStore() {
    setState({
      currList: {
        name: "New Shopping List",
        status: "un-saved",
      },
      currListItems: {},
      crossedItems: [],
      itemsGrouped: {},
      itemsUngrouped: [],
      listsUngrouped: [],
      listsGrouped: {},
      user: null,
      stats: {
        byCategory: [],
        byItem: [],
        byMonth: [],
      },
    });
  },
}));
