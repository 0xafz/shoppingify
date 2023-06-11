import cfetch from "~/lib/cfetch";
import { Action, IShoppingList, ItemInList } from "~/types";
import { StoreSlice } from ".";
import { produce } from "immer";
import { getGroupByKeyString, groupBy, groupByTime } from "~/utils/client";

type ItemWithIdCat = {
  shoppingItemId: number;
  itemCategory: string;
};
export type ShoppingListActions =
  | Action<"list:delete", { id: number; createdAt: string }>
  | Action<"list:cancel", IShoppingList>
  | Action<"list:save", IShoppingList>
  | Action<"list:complete", IShoppingList>
  | Action<"list:update", IShoppingList>
  | Action<"list:add-item", ItemInList>
  | Action<"list:update-item-quantity", Omit<ItemInList, "itemName">>
  | Action<"list:delete-item", ItemWithIdCat>
  | Action<
      "list:toggle-item-purchase",
      ItemInList & { itemPurchased: boolean }
    >;

const AddToListsUngroupedAndRegroup = (
  state: ShoppingListSlice,
  list: IShoppingList
) => {
  // TODO: make it good
  if (!list.id) return;
  const idx = state.listsUngrouped.findIndex((list) => list.id === list.id);
  if (idx !== -1) {
    state.listsUngrouped[idx] = list;
    return; // modified existing grouped item ,no need to regroup
  } else {
    // why unshift: listsUngrouped is sorted by desc time,latest items pushed front
    state.listsUngrouped.unshift(list);
  }
  state.listsGrouped = groupByTime<IShoppingList>(
    state.listsUngrouped,
    "createdAt",
    "month"
  );
};
const upsertToGroupedList = (state: ShoppingListSlice, list: IShoppingList) => {
  const groupByKey = getGroupByKeyString(new Date(list.createdAt), "month");
  state.listsGrouped[groupByKey] = state.listsGrouped[groupByKey] || [];

  const idx = state.listsGrouped[groupByKey].findIndex(
    (item) => item.id === list.id
  );
  if (idx !== -1) {
    state.listsGrouped[groupByKey][idx] = {
      ...state.listsGrouped[groupByKey][idx],
      ...list,
    };
    // adding a new list, need to keep in sync with grouped data
    state.listsUngrouped.unshift(list);
    return;
  }
  state.listsGrouped[groupByKey].unshift(list);
};
const deleteFromGroupedList = (
  state: ShoppingListSlice,
  list: { id: number; createdAt: string }
) => {
  const groupByKey = getGroupByKeyString(new Date(list.createdAt), "month");
  state.listsGrouped[groupByKey] = state.listsGrouped[groupByKey] || [];
  const idx = state.listsGrouped[groupByKey].findIndex(
    (item) => item.id === list.id
  );
  if (idx === -1) {
    return;
  }
  state.listsGrouped[groupByKey] = state.listsGrouped[groupByKey].filter(
    (item) => item.id !== list.id
  );
  if (!state.listsGrouped[groupByKey]) delete state.listsGrouped[groupByKey];
  state.listsUngrouped = state.listsUngrouped.filter(
    (item) => item.id !== list.id
  );
};
const resetCurrList = (state: ShoppingListSlice) => {
  state.currList = {
    name: "New Shopping List",
    status: "un-saved",
  };
  state.currListItems = {};
  state.crossedItems = [];
};
const shoppingListReducer = (
  state: ShoppingListSlice,
  action: ShoppingListActions
) => {
  switch (action.type) {
    case "list:delete":
      deleteFromGroupedList(state, action.payload);
      if (state.currList.id === action.payload.id) {
        resetCurrList(state);
      }
      break;
    case "list:save":
      upsertToGroupedList(state, action.payload);
      state.currList = action.payload;
      break;
    case "list:update":
      upsertToGroupedList(state, action.payload);
      break;
    case "list:cancel":
      upsertToGroupedList(state, action.payload);
      resetCurrList(state);
      break;
    case "list:complete":
      upsertToGroupedList(state, action.payload);
      resetCurrList(state);
      break;
    case "list:add-item":
      if (!state.currList) {
        resetCurrList(state);
      }
      const { itemCategory, shoppingItemId } = action.payload;
      if (itemCategory in state.currListItems) {
        const targetItems = state.currListItems[itemCategory];

        // if adding existing item, just increment quantity
        if (targetItems && targetItems.length !== 0) {
          const Idx = targetItems.findIndex(
            (item) => item.shoppingItemId === shoppingItemId
          );
          if (Idx !== -1) {
            targetItems[Idx].quantity += 1;
            return;
          }
        }
        state.currListItems[itemCategory].push(action.payload);
      } else {
        state.currListItems[itemCategory] = [action.payload];
      }
      break;
    case "list:update-item-quantity":
      {
        const { itemCategory, shoppingItemId, quantity } = action.payload;
        const targetItems = state.currListItems[itemCategory];
        if (!targetItems) return;
        const Idx = targetItems.findIndex(
          (item) => item.shoppingItemId === shoppingItemId
        );
        if (Idx < 0) {
          console.error("update item not found in current list");
          return;
        }
        targetItems[Idx].quantity = quantity;
      }
      break;
    case "list:delete-item":
      {
        const { itemCategory, shoppingItemId } = action.payload;
        const targetItems = state.currListItems[itemCategory];
        if (!targetItems) return;
        const Idx = targetItems.findIndex(
          (item) => item.shoppingItemId === shoppingItemId
        );
        if (Idx < 0) {
          console.error("update item not found in current list");
          return;
        }
        targetItems.splice(Idx, 1);
        if (!targetItems.length) delete state.currListItems[itemCategory];
      }
      break;
    case "list:toggle-item-purchase":
      {
        const idx = state.crossedItems.findIndex(
          (item) => item.shoppingItemId === action.payload.shoppingItemId
        );
        if (idx !== -1)
          state.crossedItems[idx].itemPurchased =
            !state.crossedItems[idx].itemPurchased;
        else state.crossedItems.push(action.payload);
      }
      break;
    default:
      break;
  }
};

export type ShoppingListSlice = {
  listsUngrouped: Array<IShoppingList>;
  listsGrouped: Record<string, Array<IShoppingList>>;
  crossedItems: Array<ItemInList & { itemPurchased: boolean }>;
  currListItems: Record<string, Array<ItemInList>>;
  currList: {
    name: string;
    status: string;
    id?: number; // when list fetched from server
  };
  dispatchList: (args: ShoppingListActions) => void;
  fetchShoppingLists: () => Promise<void>;
  setLatestIncompleteList: () => Promise<void>;
};
export const createShoppingListSlice: StoreSlice<ShoppingListSlice> = (
  set,
  get
) => ({
  listsUngrouped: [],
  listsGrouped: {},
  crossedItems: [],
  currList: {
    name: "Un-named list",
    status: "un-saved", // TODO: status decides part of ui,find a better way
  },
  currListItems: {},
  dispatchList: (args) =>
    set(produce((state) => shoppingListReducer(state, args))),
  fetchShoppingLists: async () => {
    if (get().listsUngrouped.length > 0) return;
    const result = await cfetch(`/api/lists`, {
      method: "GET",
    });
    if (result.data) {
      set({
        listsUngrouped: result.data.lists,
        listsGrouped: groupByTime<IShoppingList>(
          result.data.lists,
          "createdAt",
          "month"
        ),
      });
    }
  },
  setLatestIncompleteList: async () => {
    // TODO: better approach ?? , or how to use this
    const { listsUngrouped, listsGrouped } = get();

    const latestIncompleteList = listsUngrouped.filter(
      (list) => list.status === "incomplete"
    )[0];
    if (!latestIncompleteList) {
      return;
    }
    const listItems = await cfetch(`/api/lists/${latestIncompleteList.id}`, {
      method: "GET",
    });
    if (listItems.data) {
      set({
        currList: latestIncompleteList,
        currListItems: groupBy(listItems.data.shoppingItems, "itemCategory"),
      });
    }
  },
});
