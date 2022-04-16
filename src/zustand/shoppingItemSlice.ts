import produce from "immer"
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
      const { category } = action.payload
      if (category in state.itemsGrouped) {
        state.itemsGrouped[category].push(action.payload)
      } else {
        state.itemsGrouped[category] = [action.payload]
      }
      break
    case "item:remove":
      {
        const { category, itemId } = action.payload
        const targetItems = state.itemsGrouped[category]
        if (!targetItems) {
          return
        }
        const filteredCatElements = targetItems.filter(
          (item) => item.id !== itemId
        )
        state.itemsGrouped[category] = filteredCatElements
      }
      break
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
  dispatchItem: (args) =>
    set(produce((state) => shoppingItemReducer(state, args))),
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
