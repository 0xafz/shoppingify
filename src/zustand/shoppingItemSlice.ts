import cfetch from "~/lib/cfetch"
import { IShoppingItem } from "~/types"
import { StoreSlice } from "."

export type ShoppingItemSlice = {
  items: Array<IShoppingItem>
  addShoppingItem: (item: IShoppingItem) => void
  removeShoppingItem: (id: number) => void
  resetShoppingItems: () => void
}

export const createShoppingItemSlice: StoreSlice<ShoppingItemSlice> = (
  set,
  get
) => ({
  items: [],
  addShoppingItem: (item) => {
    set((prev) => ({ items: [...prev.items, item] }))
  },
  removeShoppingItem: async (id) => {
    const result = await cfetch(`/api/items/${id}`, {
      method: "DELETE",
    })
    set((prev) => ({ items: [...prev.items, result] }))
  },
  resetShoppingItems: async () => {
    const result = await cfetch(`/api/items`, {
      method: "GET",
    })
    set({ items: result })
  },
})
