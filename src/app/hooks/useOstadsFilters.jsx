import { useOstadsStore } from "@/store/useOstadsStore";
import { useEffect } from "react";

export default function useOstadsFilters(filters) {
  const setOstads = useOstadsStore(state => state.setOstads)
  let filteredOstads = null
  console.log('filters: ', filters);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/ostads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      })
      filteredOstads = await res.json()
      setOstads(filteredOstads)
    }
    fetchData()
  }, [filters])
  return [filteredOstads]
}