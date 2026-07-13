"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function RouteBtn(props) {
    const pathName = usePathname()

    const {Icon, path } = props
    return (
        <Link href={path} className={`${pathName == path ? 'bg-[#0056AA] text-zinc-950' : 'bg-zinc-950 text-[#0056AA]'} flex-1 h-16 flex justify-center items-center`}>
            <Icon/>
        </Link>
    )
}

export default RouteBtn