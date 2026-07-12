"use client"
import { useAuthStore } from '@/store/useAuthStore'
import { Bookmark, DollarSign, LogOut, MessageSquareIcon, MessagesSquare, PlusCircle, ShoppingBasket, User2, UserCog2, UserPlus2, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const routes = [
    { name: 'اطلاعات من', icon: UserCog2, path: '/panel/userInfo' },
    { name: 'معاملات من', icon: DollarSign, path: '#' },
    { name: 'آگهی های من', icon: ShoppingBasket, path: '/panel/myProducts' },
    { name: 'دیدگاه های من', icon: MessageSquareIcon, path: '/panel/myComments' },
    { name: 'نشان شده ها', icon: Bookmark, path: '/panel/myMarks' },
    { name: 'گفتوگو های من', icon: MessagesSquare, path: '/panel/chats' },
    { name: 'اساتید ثبت شده', icon: User2, path: '/panel/myOstads' },
    { name: 'اگهی جدید', icon: PlusCircle, path: '/panel/newProduct' },
    { name: 'ثبت استاد', icon: UserPlus2, path: '/panel/newOstad' },
    { name: 'خروج', icon: LogOut, path: '/' },
]

function Menu() {
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
                        key={index}
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

export default Menu