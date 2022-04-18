import cfetch from "~/lib/cfetch"
import { Action, IShoppingList, ItemInList } from "~/types"
import { StoreSlice } from "."
import produce from "immer"
import { groupBy, groupByTime } from "~/utils/client"

type ItemWithIdCat = {
  shoppingItemId: number
  itemCategory: string
}
export type ShoppingListActions =
  | Action<"list:cancel-currList">
  | Action<"list:add-and-set-as-currList", IShoppingList>
  | Action<"list:complete">
  | Action<"list:upsert", IShoppingList>
  | Action<"list:add-item", ItemInList>
  | Action<"list:update-item", Omit<ItemInList, "itemName">>
  | Action<"list:delete-item", ItemWithIdCat>
  | Action<"list:toggle-item-purchase", { shoppingItemId: number }>

const shoppingListReducer = (
  state: ShoppingListSlice,
  action: ShoppingListActions
) => {
  switch (action.type) {
    case "list:add-and-set-as-currList":
      state.listsUngrouped.push(action.payload)
      state.listsGrouped = groupByTime<IShoppingList>(
        state.listsUngrouped,
        "createdAt",
        "month"
      )
      state.currList = action.payload
      break
    case "list:upsert":
      if (!action.payload.id) return
      const idx = state.listsUngrouped.findIndex(
        (list) => list.id === action.payload.id
      )
      if (idx !== -1) {
        state.listsUngrouped[idx] = action.payload
      } else {
        state.listsUngrouped.push(action.payload)
      }
      state.listsGrouped = groupByTime<IShoppingList>(
        state.listsUngrouped,
        "createdAt",
        "month"
      )
      break
    case "list:cancel-currList":
      state.currList = {
        name: "New Shopping List",
        status: "un-saved",
      }
      state.currListItems = {}
      state.crossedItems = []
      break
    case "list:complete":
      state.currList = {
        name: "New Shopping List",
        status: "un-saved",
      }
      state.currListItems = {}
      state.crossedItems = []
      break
    case "list:add-item":
      if (!state.currList) {
        state.currList = {
          name: "Shopping list",
          status: "un-saved",
        }
      }
      const { itemCategory, shoppingItemId } = action.payload
      if (itemCategory in state.currListItems) {
        const targetItems = state.currListItems[itemCategory]

        // if adding existing item, just increment quantity
        if (targetItems && targetItems.length !== 0) {
          const Idx = targetItems.findIndex(
            (item) => item.shoppingItemId === shoppingItemId
          )
          if (Idx !== -1) {
            targetItems[Idx].quantity += 1
            return
          }
        }
        state.currListItems[itemCategory].push(action.payload)
      } else {
        state.currListItems[itemCategory] = [action.payload]
      }
      break
    case "list:update-item":
      {
        const { itemCategory, shoppingItemId, quantity } = action.payload
        const targetItems = state.currListItems[itemCategory]
        if (!targetItems) return
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
        const { itemCategory, shoppingItemId } = action.payload
        const targetItems = state.currListItems[itemCategory]
        if (!targetItems) return
        const Idx = targetItems.findIndex(
          (item) => item.shoppingItemId === shoppingItemId
        )
        if (Idx < 0) {
          console.error("update item not found in current list")
          return
        }
        targetItems.splice(Idx, 1)
        if (!targetItems.length) delete state.currListItems[itemCategory]
      }
      break
    case "list:toggle-item-purchase":
      {
        const idx = state.crossedItems.findIndex(
          (item) => item.shoppingItemId === action.payload.shoppingItemId
        )
        if (idx !== -1)
          state.crossedItems[idx].itemPurchased =
            !state.crossedItems[idx].itemPurchased
        else state.crossedItems.push({ ...action.payload, itemPurchased: true })
      }
      break
    default:
      break
  }
}

export type ShoppingListSlice = {
  listsUngrouped: Array<IShoppingList>
  listsGrouped: Array<[string, Array<IShoppingList>]>
  crossedItems: Array<{ shoppingItemId: number; itemPurchased: boolean }>
  currListItems: Record<string, Array<ItemInList>>
  currList: {
    name: string
    status: string
    id?: number // when list fetched from server
  }
  dispatchList: (args: ShoppingListActions) => void
  fetchShoppingLists: () => Promise<void>
  getLatestIncompleteList: () => Promise<void>
}
export const createShoppingListSlice: StoreSlice<ShoppingListSlice> = (
  set,
  get
) => ({
  listsUngrouped: [],
  listsGrouped: [],
  crossedItems: [],
  currList: {
    name: "Un-named list",
    status: "un-saved", // TODO: status decides part of ui,find a better way
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
  getLatestIncompleteList: async () => {
    console.log("getLate:wa")

    const { listsUngrouped, listsGrouped } = get()
    console.log({ listsUngrouped, listsGrouped })

    const latestIncompleteList = listsUngrouped.filter(
      (list) => list.status === "incomplete"
    )[0]
    console.log({ listsUngrouped, listsGrouped, latestIncompleteList })
    if (!latestIncompleteList) {
      return
    }
    const listItems = await cfetch(`/api/lists/${latestIncompleteList.id}`, {
      method: "GET",
    })
    if (listItems.data) {
      set({
        currList: latestIncompleteList,
        currListItems: groupBy(listItems.data.shoppingItems, "itemCategory"),
      })
    }
  },
})
