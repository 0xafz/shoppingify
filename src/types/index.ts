import { User } from "@prisma/client";

export type DecodedUser = {
  id: number;
  [x: string]: any;
};

export type CreateUserInput = Omit<User, "createdAt" | "updatedAt" | "id">;

export type IUser = Omit<User, "password" | "createdAt" | "updatedAt"> & {
  createdAt: string;
};
export type CreateListInput = {
  name: string;
  status: string;
};
export type CreateItemInput = {
  name: string;
  note?: string;
  imageUrl?: string;
  category: string;
};
export type ItemInList = {
  shoppingItemId: number;
  quantity: number;
  itemName: string;
  itemCategory: string;
};
export type ShoppingListWithItems = IShoppingList & {
  shoppingItems: ItemInList[];
};

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type IShoppingList = {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export type IShoppingItem = {
  id: number;
  name: string;
  note: string | null;
  imageUrl: string | null;
  category: string;
  createdAt: string;
  userId: number;
};

export type Action<T, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P };

// Source: https://startfunction.com/typescript-selected-type-properties-optional/
export type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>;
