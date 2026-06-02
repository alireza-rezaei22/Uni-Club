import { create } from "zustand";

export const useUserCommentsStore = create((set) => ({
    comments: [],
    setComments: (comments) => set({ comments })
}))
