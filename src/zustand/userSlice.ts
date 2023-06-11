import cfetch from "~/lib/cfetch";
import { IUser } from "~/types";
import { StateCreator } from "zustand";

export type UserSlice = {
  user: IUser;
  stats: {
    byMonth: Array<{ month: string; quantity: number }>;
    byCategory: { quantity: number; categoryName: string }[];
    byItem: { quantity: number; itemName: string }[];
  };
  setUser: (user: IUser) => void;
  fetchStats: () => Promise<void>;
};
export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  user: null,
  stats: {
    byCategory: [],
    byItem: [],
    byMonth: [],
  },
  setUser: (user) => set({ user }),
  fetchStats: async () => {
    const user = get().user;
    if (!user) return;
    const result = await cfetch(`api/users/${user.id}/stats`, {
      method: "GET",
    });
    if (result.data) {
      set({
        stats: result.data,
      });
    }
  },
});

export const selectUser = (state) => state.user;
