import { create } from "zustand";

export const UseUProductsStore = create((set)=>({
    UProducts:[],
    setUProducts: (newItem) => set((state)=>({
        UProducts: newItem
    })),
    clearUProducts: () => set({ UProducts: [] })
}))