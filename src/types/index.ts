import { User, ShoppingList, ShoppingItem } from "@prisma/client"

export type DecodedUser = {
  id: number
  [x: string]: any
}

export type CreateUserInput = Omit<User, "createdAt" | "updatedAt" | "id">

export type IUser = Omit<User, "password" | "createdAt" | "updatedAt"> & {
  createdAt: string
}
export type CreateListInput = {
  name: string
  status: string
}
export type CreateItemInput = {
  name: string
  note?: string
  imageUrl?: string
  category: string
}
export type ItemInList = {
  shoppingItemId: number
  quantity: number
  name: string
  category: string
}

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type IShoppingList = ShoppingList

export type IShoppingItem = ShoppingItem

export type Action<T, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P }
