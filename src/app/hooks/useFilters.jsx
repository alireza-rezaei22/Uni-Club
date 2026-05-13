import { useProductsStore } from "@/store/uesProductsStore";
import { useEffect } from "react";

export default function useFilters(filters) {
  const setProducts = useProductsStore(state => state.setProducts)
  let filteredProducts = null
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      })
      filteredProducts = await res.json()
      setProducts(filteredProducts)
    }
    fetchData()
  }, [filters])
  return [filteredProducts]
}