import { create } from "zustand";

export const useFilterSotre = create((set) => ({
    filters: {},
    setFilters: (newFilter) => set((state) => ({
        filters: { ...state.filters, ...newFilter }
    })),
    clearFilters: () => set({ filters: {} })
}))
