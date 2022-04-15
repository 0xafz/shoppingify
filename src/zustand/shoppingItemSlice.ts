import cfetch from "~/lib/cfetch"
import { IShoppingItem } from "~/types"
import { groupBy } from "~/utils/client"
import { StoreSlice } from "."

export type ShoppingItemSlice = {
  items: Record<string, Array<IShoppingItem>>
  addShoppingItem: (item: IShoppingItem) => void
  removeShoppingItem: (id: number, category: string) => void
  fetchShoppingItems: () => void
}
export const createShoppingItemSlice: StoreSlice<ShoppingItemSlice> = (
  set,
  get
) => ({
  items: {},
  addShoppingItem: async (item) => {
    const filteredCategory = get().items[item.category]
    if (!filteredCategory) {
      set((prev) => ({ items: { ...prev.items, [item.category]: [item] } }))
    } else {
      set((prev) => ({
        items: { ...prev.items, [item.category]: [...filteredCategory, item] },
      }))
    }
  },
  removeShoppingItem: async (id: number, category: string) => {
    await cfetch(`/api/items/${id}`, {
      method: "DELETE",
    })
    const catElements = get().items[category]
    if (!catElements) {
      return
    }
    const filteredCatElements = catElements.filter((item) => item.id !== id)
    set((prev) => ({
      items: { ...prev.items, [category]: [...filteredCatElements] },
    }))
  },
  fetchShoppingItems: async () => {
    const result = await cfetch(`/api/items`, {
      method: "GET",
    })

    if (result.data) {
      set({ items: groupBy(result.data.items, "category") })
    }
  },
})
