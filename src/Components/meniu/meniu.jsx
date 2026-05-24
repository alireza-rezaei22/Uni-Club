"use client"
import { useAuthStore } from '@/store/useAuthStore'
import { Bookmark, DollarSign, LogOut, MessagesSquare, PlusCircle, ShoppingBasket, UserPlus2, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const routes = [
    { name: 'اطلاعات من', icon: UserRound, path: '/panel/userInfo' },
    { name: 'آگهی های من', icon: ShoppingBasket, path: '/panel/myProducts' },
    { name: 'معاملات من', icon: DollarSign, path: '#' },
    { name: 'اگهی جدید', icon: PlusCircle, path: '/panel/newProduct' },
    { name: 'ثبت استاد', icon: UserPlus2, path: '/panel/newOstad' },
    { name: 'نشان شده ها', icon: Bookmark, path: '/panel/markedProducts' },
    { name: 'گفتوگو های من', icon: MessagesSquare, path: '/panel/chats' },
    { name: 'خروج', icon: LogOut, path: '/' },
]

function Meniu() {
    const logOut = useAuthStore(state => state.clearUser)
    const router = useRouter()

    const logOutHandler = async () => {
        router.push('/')
        const res = await fetch('/api/logOut', { method: 'POST' })
        if (res.ok) {
            logOut()
            const data = await res.json()
            toast.success(data.msg, { position: 'bottom-center' })
        } else {
            const data = await res.json()
            toast.error(data.msg, { position: 'bottom-center' })
        }
    }
    return (
        <ul className='md:hidden flex flex-col gap-2 p-2 mb-14'>
            {routes.map((route, index) => {
                return route.name === 'خروج' ?
                    <button
                        className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md transition-colors text-indigo-400 hover:bg-indigo-200 hover:text-gray-700'
                        onClick={logOutHandler}
                    >
                        <route.icon />
                        {route.name}
                    </button>
                    : <Link
                        key={index} href={route.path}
                        className='hover:bg-indigo-200 hover:text-gray-700 text-indigo-400 flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md transition-colors'
                    >
                        <route.icon />
                        {route.name}
                    </Link>

            })}
        </ul>
    )
}

export default Meniu