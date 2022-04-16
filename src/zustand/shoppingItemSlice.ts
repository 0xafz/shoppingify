import cfetch from "~/lib/cfetch"
import { Action, IShoppingItem } from "~/types"
import { groupBy } from "~/utils/client"
import { StoreSlice } from "."

export type shoppingItemActions =
  | Action<"item:add", IShoppingItem>
  | Action<"item:remove", { itemId: number; category: string }>
  | Action<"item:fetch-all">

const shoppingItemReducer = (
  state: ShoppingItemSlice,
  action: shoppingItemActions
) => {
  switch (action.type) {
    case "item:add":
      const item = action.payload
      const filteredCategory = state.itemsGrouped[item.category]
      if (!filteredCategory) {
        return {
          ...state,
          itemsGrouped: {
            ...state.itemsGrouped,
            [item.category]: [item],
          },
        }
      } else {
        return {
          ...state,
          itemsGrouped: {
            ...state.itemsGrouped,
            [item.category]: [...filteredCategory, item],
          },
        }
      }
    case "item:remove":
      const { category, itemId } = action.payload
      const catElements = state.itemsGrouped[category]
      if (!catElements) {
        return state
      }
      const filteredCatElements = catElements.filter(
        (item) => item.id !== itemId
      )
      return {
        ...state,
        itemsGrouped: {
          ...state.itemsGrouped,
          [category]: [...filteredCatElements],
        },
      }
    default:
      break
  }
}
export type ShoppingItemSlice = {
  itemsGrouped: Record<string, Array<IShoppingItem>>
  itemsUngrouped: IShoppingItem[]
  dispatchItem: (args: shoppingItemActions) => void
  fetchShoppingItems: () => void
}
export const createShoppingItemSlice: StoreSlice<ShoppingItemSlice> = (
  set
) => ({
  itemsGrouped: {},
  itemsUngrouped: [],
  dispatchItem: (args) => set((state) => shoppingItemReducer(state, args)),
  fetchShoppingItems: async () => {
    const result = await cfetch(`/api/items`, {
      method: "GET",
    })
    if (result.data) {
      set({
        itemsUngrouped: result.data.items,
        itemsGrouped: groupBy(result.data.items, "category"),
      })
    }
  },
})
