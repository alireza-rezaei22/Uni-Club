import { create } from "zustand";

export const UseMarkStore = create((set)=>({
    marks:[],
    setMarks: (newItem) => set((state)=>({
        marks: newItem
    })),
}))