import { create } from "zustand";

export const useProductsStore= create((set)=>({
    products: null,
    setProducts: (products)=> set({products})
}))