import {
  User,
  ShoppingList,
  ShoppingItem,
  ShoppingItemToList,
} from "@prisma/client"

export type DecodedUser = {
  id: number
  [x: string]: any
}

export type IUser = Omit<User, "password" | "createdAt" | "updatedAt"> & {
  createdAt: string
}

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type IShoppingList = ShoppingList & {
  shoppingItems?: ShoppingItemToList[]
}

export type IShoppingItem = ShoppingItem

// export type IShoppingItemArgs = Partial<
//   Omit<ShoppingItem, "createdAt" | "id" | "userId">
// >

export type IShoppingListArgs = Omit<
  ShoppingList,
  "id" | "userId" | "updatedAt" | "createdAt"
> & {
  shoppingItems?: IShoppingItemToListArgs[]
}

export type IShoppingItemToListArgs = Omit<
  ShoppingItemToList,
  "assignedBy" | "assignedAt" | "shoppingListId"
>

export type Action<T, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P }
