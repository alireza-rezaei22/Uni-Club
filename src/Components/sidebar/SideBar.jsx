"use client"
import Link from 'next/link'
import React from 'react'
import { UserCog2, ShoppingBasket, User2, MessageSquareIcon, Bookmark, MessagesSquare, LogOut, PlusCircle, DollarSign, UserPlus2, Megaphone, Receipt, UsersRound } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useUserCommentsStore } from '@/store/useUserCommentsStore'
import { UseUProductsStore } from '@/store/useUProductsStore'
import { useUOstadsStore } from '@/store/useUOstadsStore'
import { UseMarkStore } from '@/store/useMarkesStore'

function SideBar() {
    const userInfo = useAuthStore(state => state.user)
    const logOut = useAuthStore(state => state.clearUser)
    const clearComments = useUserCommentsStore(state => state.clearComments)
    const clearUProducts = UseUProductsStore(state => state.clearUProducts)
    const clearOstads = useUOstadsStore(state => state.clearOstads)
    const clearMarks = UseMarkStore(state => state.clearMarks)
    const router = useRouter()
    const pathname = usePathname()
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

        const res = await fetch('/api/logOut', { method: 'POST' })
        if (res.ok) {
            logOut()
            clearComments()
            clearUProducts()
            clearOstads()
            clearMarks()
            router.push('/')
            const data = await res.json()
            toast.success(data.msg, { position: 'bottom-center' })
        } else {
            const data = await res.json()
            toast.error(data.msg, { position: 'bottom-center' })
        }
    }
    return (
        <aside className='bg-gray-800 text-[#0056AA] font-medium w-full hidden md:w-1/6 overflow-y-scroll hide-scrollbar md:flex h-[90vh] rounded-l-xl text-sm'>
            <ul className='w-full flex flex-col gap-2 p-2'>
                {routes.map((route, index) => {
                    return route.name === 'خروج' ?
                        <button
                            className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md transition-colors hover:bg-indigo-200 hover:text-gray-700'
                            onClick={logOutHandler}
                            key={index}
                        >
                            <route.Icon />
                            {route.name}
                        </button>
                        : <Link
                            key={index} href={route.path}
                            className={`${pathname === route.path && 'bg-[#0056AA] text-gray-900'} hover:bg-indigo-200 hover:text-gray-700 flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md transition-colors`}
                        >
                            <route.Icon />
                            {route.name}
                        </Link>

                })}
                {/* <Link href='/panel/userInfo' className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md hover:bg-green-200 hover:text-gray-700 transition-colors'>
                    <UserRound />
                    اطلاعات من
                </Link>
                <Link href='/panel/myProducts' className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md hover:bg-green-200 hover:text-gray-700 transition-colors'>
                    <ShoppingBasket />
                    آگهی های من
                </Link>
                <Link href='/' className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md hover:bg-green-200 hover:text-gray-700 transition-colors'>
                    <ShoppingBasket />
                    معاملات من
                </Link>
                <Link href='/panel/newProduct' className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md hover:bg-green-200 hover:text-gray-700 transition-colors'>
                    <PlusCircle />
                    اگهی جدید
                </Link>
                <Link href='/panel/markedProducts' className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md hover:bg-green-200 hover:text-gray-700 transition-colors'>
                    <Bookmark />
                    نشان شده ها
                </Link>
                <Link href='/panel/chats' className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md hover:bg-green-200 hover:text-gray-700 transition-colors'>
                    <MessagesSquare />
                    گفتوگو های من
                </Link>
                <Link href={'/'} onClick={logOutHandler} className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md hover:bg-green-200 hover:text-gray-700 transition-colors'>
                    <LogOut />
                    خروج
                </Link> */}
            </ul>
        </aside>
    )
}

export default SideBar