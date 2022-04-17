import cfetch from "~/lib/cfetch"
import { Action, IShoppingList, ItemInList } from "~/types"
import { StoreSlice } from "."
import produce from "immer"
import { groupByTime } from "~/utils/client"

export type ShoppingListActions =
  | Action<"list:add", IShoppingList>
  | Action<"list:add-item", ItemInList>
  | Action<"list:update-item", Omit<ItemInList, "name">>
  | Action<"list:delete-item", Omit<ItemInList, "name" | "quantity">>

const shoppingListReducer = (
  state: ShoppingListSlice,
  action: ShoppingListActions
) => {
  switch (action.type) {
    case "list:add":
      state.listsUngrouped.push(action.payload)
      state.listsGrouped = groupByTime<IShoppingList>(
        state.listsUngrouped,
        "createdAt",
        "month"
      )
      break
    case "list:add-item":
      if (!state.currList) {
        state.currList = {
          name: "Shopping list",
          status: "incomplete",
        }
      }
      const { category } = action.payload
      if (category in state.currListItems) {
        const targetItems = state.currListItems[category]

        const Idx = targetItems.findIndex(
          (item) => item.shoppingItemId === action.payload.shoppingItemId
        )
        if (Idx !== -1) {
          targetItems[Idx].quantity += 1
          return
        }
        state.currListItems[category].push(action.payload)
      } else {
        state.currListItems[category] = [action.payload]
      }
      break
    case "list:update-item":
      {
        const { category, shoppingItemId, quantity } = action.payload
        const targetItems = state.currListItems[category]
        const Idx = targetItems.findIndex(
          (item) => item.shoppingItemId === shoppingItemId
        )
        if (Idx < 0) {
          console.error("update item not found in current list")
          return
        }
        targetItems[Idx].quantity = quantity
      }
      break
    case "list:delete-item":
      {
        const { category, shoppingItemId } = action.payload
        const targetItems = state.currListItems[category]
        const Idx = targetItems.findIndex(
          (item) => item.shoppingItemId === shoppingItemId
        )
        if (Idx < 0) {
          console.error("update item not found in current list")
          return
        }
        targetItems.splice(Idx, 1)
        if (!targetItems.length) delete state.currListItems[category]
      }
      break
    default:
      break
  }
}

export type ShoppingListSlice = {
  listsUngrouped: Array<IShoppingList>
  listsGrouped: Array<[string, Array<IShoppingList>]>
  currListItems: Record<string, Array<ItemInList>>
  currList: {
    name: string
    status: string
  }
  dispatchList: (args: ShoppingListActions) => void
  fetchShoppingLists: () => Promise<void>
}
export const createShoppingListSlice: StoreSlice<ShoppingListSlice> = (
  set,
  get
) => ({
  listsUngrouped: [],
  listsGrouped: [],
  currList: {
    name: "shopping list",
    status: "incomplete",
  },
  currListItems: {},
  dispatchList: (args) =>
    set(produce((state) => shoppingListReducer(state, args))),
  fetchShoppingLists: async () => {
    if (get().listsUngrouped.length > 0) return
    const result = await cfetch(`/api/lists`, {
      method: "GET",
    })
    if (result.data) {
      set({
        listsUngrouped: result.data.lists,
        listsGrouped: groupByTime<IShoppingList>(
          result.data.lists,
          "createdAt",
          "month"
        ),
      })
    }
  },
})
