"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function RouteBtn(props) {
    const pathName = usePathname()

    const {Icon, path } = props
    return (
        <Link href={path} className={`${pathName == path ? 'bg-indigo-500 text-zinc-950' : 'bg-zinc-950 text-indigo-500'} flex-1 h-16 flex justify-center items-center`}>
            <Icon/>
        </Link>
    )
}

export default RouteBtn