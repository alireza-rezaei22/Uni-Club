"use client"
import { useAuthStore } from '@/store/useAuthStore'
import { Bookmark, DollarSign, LogOut, Megaphone, MessageSquareIcon, MessagesSquare, PlusCircle, Receipt, ShoppingBasket, User2, UserCog2, UserPlus2, UserRound, UsersRound } from 'lucide-react'
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
            { name: 'کاربران', Icon: UsersRound, path: '/panel/users' },
            { name: 'استادها', Icon: UsersRound, path: '/panel/ostads' },
            { name: 'آگهی ها', Icon: Megaphone, path: '/panel/products' },
        ] : []),
        { name: 'معاملات من', Icon: Receipt, path: '#' },
        { name: 'آگهی های من', Icon: Megaphone, path: '/panel/myProducts' },
        { name: 'دیدگاه های من', Icon: MessageSquareIcon, path: '/panel/myComments' },
        { name: 'نشان شده ها', Icon: Bookmark, path: '/panel/myMarks' },
        { name: 'گفتوگو های من', Icon: MessagesSquare, path: '/panel/chats' },
        { name: 'استادهای ثبت شده', Icon: UsersRound, path: '/panel/myOstads' },
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
        <>
            <div className='md:hidden flex flex-col justify-center items-center gap-3'>
                <div className='bg-zinc-300 size-28 rounded-full flex justify-center items-center'>
                    <UserRound className='size-20 text-zinc-800' />
                </div>
                <h2 className='text-zinc-200'>{userInfo?.name}</h2>
                <h4 className='text-zinc-500 text-sm font-light'>{userInfo?.phone}</h4>
            </div>
            <ul className='md:hidden flex flex-col gap-2 p-2 mb-14'>
                {routes.map((route, index) => {
                    return route.name === 'خروج' ?
                        <button
                            key={index}
                            className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md transition-colors text-[#0056AA] hover:bg-indigo-200 hover:text-gray-700'
                            onClick={logOutHandler}
                        >
                            <route.Icon />
                            {route.name}
                        </button>
                        : <Link
                            key={index} href={route.path}
                            className='hover:bg-indigo-200 hover:text-gray-900 text-[#0056AA] flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md transition-colors'
                        >
                            <route.Icon />
                            {route.name}
                        </Link>

                })}
            </ul>
        </>
    )
}

export default Menu