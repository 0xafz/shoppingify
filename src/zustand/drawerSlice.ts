import { Action, IShoppingItem } from "~/types";
import { produce } from "immer";
import { StateCreator } from "zustand";

export type DrawerActions =
  | Action<"drawer:set", "create-list" | "item-info" | "create-item">
  | Action<"drawer:set-info-item", IShoppingItem>
  | Action<"drawer:hide">
  | Action<"drawer:toggle">;

export type DrawerSlice = {
  showRightSideDrawer: boolean;
  rightSideDrawerType: "create-list" | "item-info" | "create-item";
  itemInDrawer: IShoppingItem;
  dispatchDrawer: (args: DrawerActions) => void;
};
const drawerReducer = (state: DrawerSlice, action: DrawerActions) => {
  switch (action.type) {
    case "drawer:set":
      state.rightSideDrawerType = action.payload;
      state.showRightSideDrawer = true;
      break;
    case "drawer:set-info-item":
      state.itemInDrawer = action.payload;
      state.rightSideDrawerType = "item-info";
      state.showRightSideDrawer = true;
      break;
    case "drawer:hide":
      state.showRightSideDrawer = false;
      break;
    case "drawer:toggle":
      state.showRightSideDrawer = !state.showRightSideDrawer;
      break;
    default:
      break;
  }
};
export const createDrawerSlice: StateCreator<DrawerSlice> = (set) => ({
  rightSideDrawerType: "create-list",
  showRightSideDrawer: false,
  itemInDrawer: null,
  dispatchDrawer: (args) => set(produce((state) => drawerReducer(state, args))),
});
