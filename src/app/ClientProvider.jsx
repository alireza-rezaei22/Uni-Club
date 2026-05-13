"use client"
import { useAuthStore } from "@/store/useAuthStore"
import { useLayoutEffect } from "react"

export function ClientProvider({children, userData}) {
    const setUser = useAuthStore(state => state.setUser)
    useLayoutEffect(() => {
        setUser(userData)
    },[userData, setUser])
    return (
        <>{children}</>
    )
}
export default ClientProvider