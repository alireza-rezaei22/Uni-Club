"use client"
import { useAuthStore } from '@/store/useAuthStore'
import { Bookmark, DollarSign, LogOut, MessageSquareIcon, MessagesSquare, PlusCircle, ShoppingBasket, User2, UserCog2, UserPlus2, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'



function Menu() {
    const userInfo = useAuthStore(state => state.user)
    const logOut = useAuthStore(state => state.clearUser)
    const router = useRouter()
    const routes = [
        { name: 'اطلاعات من', Icon: UserCog2, path: '/panel/userInfo' },
        ...(userInfo?.role === 'admin' ? [
            { name: 'کاربران', Icon: DollarSign, path: '/panel/users' },
            { name: 'استادها', Icon: DollarSign, path: '/panel/ostads' },
            { name: 'آگهی ها', Icon: DollarSign, path: '/panel/products' },
        ] : []),
        { name: 'معاملات من', Icon: DollarSign, path: '#' },
        { name: 'آگهی های من', Icon: ShoppingBasket, path: '/panel/myProducts' },
        { name: 'دیدگاه های من', Icon: MessageSquareIcon, path: '/panel/myComments' },
        { name: 'نشان شده ها', Icon: Bookmark, path: '/panel/myMarks' },
        { name: 'گفتوگو های من', Icon: MessagesSquare, path: '/panel/chats' },
        { name: 'استادهای ثبت شده', Icon: User2, path: '/panel/myOstads' },
        { name: 'اگهی جدید', Icon: PlusCircle, path: '/panel/newProduct' },
        { name: 'ثبت استاد', Icon: UserPlus2, path: '/panel/newOstad' },
        { name: 'خروج', Icon: LogOut, path: '/' },
    ]
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
                        <route.Icon />
                        {route.name}
                    </button>
                    : <Link
                        key={index} href={route.path}
                        className='hover:bg-indigo-200 hover:text-gray-700 text-indigo-400 flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md transition-colors'
                    >
                        <route.Icon />
                        {route.name}
                    </Link>

            })}
        </ul>
    )
}

export default Menu