import cfetch from "~/lib/cfetch"
import { IShoppingItem } from "~/types"
import { StoreSlice } from "."

export type ShoppingItemSlice = {
  items: Array<IShoppingItem>
  createShoppingItem: (item: IShoppingItem) => void
  removeShoppingItem: (id: number) => void
  resetShoppingItems: () => void
}

export const createShoppingItemSlice: StoreSlice<ShoppingItemSlice> = (
  set,
  get
) => ({
  items: [],
  createShoppingItem: async (item) => {
    try {
      const result = await cfetch("/api/items", {
        method: "POST",
        body: JSON.stringify(item),
      })
      set((prev) => ({ items: [...prev.items, result] }))
    } catch (error) {
      console.error(error)
    }
  },
  removeShoppingItem: async (id) => {
    try {
      const result = await cfetch(`/api/items/${id}`, {
        method: "DELETE",
      })
      set((prev) => ({ items: [...prev.items, result] }))
    } catch (error) {
      console.error(error)
    }
  },
  resetShoppingItems: async () => {
    try {
      const result = await cfetch(`/api/items`, {
        method: "GET",
      })
      set({ items: result })
    } catch (error) {
      console.error(error)
    }
  },
})
