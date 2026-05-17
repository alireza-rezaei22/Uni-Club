import { create } from "zustand";

export const useFilterOstadStore = create((set) => ({
    order: '',
    degrees: [],
    category: '',

    setOrder: (order) => set({ order }),
    setCategory: (category) => set({ category }),
    setDegrees: (newDegree) => set((state) => ({
        degrees: state.degrees.includes(newDegree) ? state.degrees.filter(degree => degree != newDegree) : [...state.degrees, newDegree]
    })),
    clearFilters: () => {
        set({ order: '', })
        set({ degrees: [], })
        set({ category: '', })
    }
}
))
