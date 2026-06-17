import { create } from "zustand";

export const useUOstadsStore= create((set)=>({
    ostads: [],
    setOstads: (ostads)=> set({ostads})
}))