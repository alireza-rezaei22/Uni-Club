import { create } from "zustand";

export const useOstadsStore= create((set)=>({
    ostads: null,
    setOstads: (ostads)=> set({ostads})
}))