import cfetch from "~/lib/cfetch"
import { IShoppingList } from "~/types"
import { StoreSlice } from "."

export type ShoppingListSlice = {
  lists: Array<IShoppingList>
  createShoppingList: (item: IShoppingList) => void
  removeShoppingList: (id: number) => void
  resetShoppingLists: () => void
}
export const createShoppingListSlice: StoreSlice<ShoppingListSlice> = (
  set,
  get
) => ({
  lists: [],
  currList: null,
  createShoppingList: async (list: IShoppingList) => {
    try {
      const result = await cfetch("/api/lists", {
        method: "POST",
        body: JSON.stringify(list),
      })
      set((prev) => ({ lists: [...prev.lists, result] }))
    } catch (err) {
      console.error(err)
    }
  },
  updateShoppingList: async (id: number, data: IShoppingList) => {
    try {
      const targetIdx = get().lists.findIndex((list) => list.id === id)
      if (targetIdx === -1) throw new Error("list not found")
      const result = await cfetch(`/api/lists/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      })

      set((prev) => ({
        lists: prev.lists
          .slice(0, targetIdx)
          .concat(prev.lists.slice(targetIdx + 1))
          .concat([{ ...prev.lists.at(targetIdx), ...data }]),
      }))
    } catch (err) {
      console.error(err)
    }
  },
  removeShoppingList: async (id: number) => {
    try {
      await cfetch(`/api/lists/${id}`, {
        method: "DELETE",
      })
      set((prev) => ({ lists: prev.lists.filter((list) => list.id !== id) }))
    } catch (error) {
      console.error(error)
    }
  },
  resetShoppingLists: async () => {
    try {
      const result = await cfetch(`/api/lists`, {
        method: "GET",
      })
      set({ lists: result })
    } catch (error) {
      console.error(error)
    }
  },
  addShoppingItemToList: async (
    listId: number,
    item: {
      shoppingItemId: number
      quantity: number
    }
  ) => {
    try {
      const result = await cfetch(`/api/lists${listId}`, {
        method: "PATCH",
        body: JSON.stringify(item),
      })
      set((prev) => ({ lists: [...prev.lists, result] }))
    } catch (error) {
      console.error(error)
    }
  },
})
