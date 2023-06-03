import produce from "immer";
import cfetch from "~/lib/cfetch";
import { Action, IShoppingItem } from "~/types";
import { groupBy } from "~/utils/client";
import { StoreSlice } from ".";

export type shoppingItemActions =
  | Action<"item:add", IShoppingItem>
  | Action<"item:delete", { itemId: number; category: string }>
  | Action<"item:fetch-all">;

const shoppingItemReducer = (
  state: ShoppingItemSlice,
  action: shoppingItemActions
) => {
  switch (action.type) {
    case "item:add":
      const { category } = action.payload;
      state.itemsGrouped[category] = state.itemsGrouped[category] || [];
      state.itemsGrouped[category].push(action.payload);
      break;
    case "item:delete":
      {
        const { category, itemId } = action.payload;
        const targetItems = state.itemsGrouped[category];
        if (targetItems.length === 0) {
          return;
        }
        const filteredCatElements = targetItems.filter(
          (item) => item.id !== itemId
        );
        state.itemsGrouped[category] = filteredCatElements;
        if (!state.itemsGrouped[category].length)
          delete state.itemsGrouped[category];
      }
      break;
    default:
      break;
  }
};
export type ShoppingItemSlice = {
  itemsGrouped: Record<string, Array<IShoppingItem>>;
  itemsUngrouped: IShoppingItem[];
  itemCategories: string[];
  dispatchItem: (args: shoppingItemActions) => void;
  fetchShoppingItems: () => void;
};
export const createShoppingItemSlice: StoreSlice<ShoppingItemSlice> = (
  set,
  get
) => ({
  itemsGrouped: {},
  itemsUngrouped: [],
  itemCategories: [
    "Fruits and vegetables",
    "Meat and Fish",
    "Beverages",
    "Groceries",
    "Other",
  ],
  dispatchItem: (args) =>
    set(produce((state) => shoppingItemReducer(state, args))),
  fetchShoppingItems: async () => {
    // Don't fetch if items already exists (TODO: make it better)
    if (get().itemsUngrouped.length > 0) return;
    const result = await cfetch(`/api/items`, {
      method: "GET",
    });
    if (result.data) {
      set({
        itemsUngrouped: result.data.items,
        itemsGrouped: groupBy(result.data.items, "category"),
      });
    }
  },
});
