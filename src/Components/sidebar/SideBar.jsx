"use client"
import Link from 'next/link'
import React from 'react'
import { UserRound, ShoppingBasket, MessageSquareIcon, Bookmark, MessagesSquare, LogOut, PlusCircle, DollarSign, UserPlus2 } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

function SideBar() {
    const logOut = useAuthStore(state => state.clearUser)
    const router = useRouter()
    console.log('should remove token from cookies here(sidebar)');
    const pathname = usePathname()
    const routes = [
        { name: 'اطلاعات من', icon: UserRound, path: '/panel/userInfo' },
        { name: 'انتشار های من', icon: ShoppingBasket, path: '/panel/myProducts' },
        { name: 'دیدگاه های من', icon: MessageSquareIcon, path: '/panel/myComments' },
        { name: 'معاملات من', icon: DollarSign, path: '#' },
        { name: 'اگهی جدید', icon: PlusCircle, path: '/panel/newProduct' },
        { name: 'ثبت استاد', icon: UserPlus2, path: '/panel/newOstad' },
        { name: 'نشان شده ها', icon: Bookmark, path: '/panel/markedProducts' },
        { name: 'گفتوگو های من', icon: MessagesSquare, path: '/panel/chats' },
        { name: 'خروج', icon: LogOut, path: '/' },
    ]

    const logOutHandler = async () => {
        
        router.push('/')
        const res = await fetch('/api/logOut', {method: 'POST'})        
        if (res.ok) {
            logOut()
            const data = await res.json()
            toast.success(data.msg, {position: 'bottom-center'})
        }else{
            const data = await res.json()
            toast.error(data.msg, {position: 'bottom-center'})
        }
    }
    return (
        <aside className='bg-gray-700 text-indigo-500 w-full hidden md:w-1/6 md:flex h-[90vh] rounded-l-xl text-sm font-medium'>
            <ul className='w-full flex flex-col gap-2 p-2'>
                {routes.map((route, index) => {
                    return route.name === 'خروج' ?
                        <button
                            className='flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md transition-colors hover:bg-indigo-200 hover:text-gray-700'
                            onClick={logOutHandler}
                            key={index}
                        >
                            <route.icon />
                            {route.name}
                        </button>
                        : <Link
                            key={index} href={route.path}
                            className={`${pathname === route.path ? 'bg-indigo-400 text-gray-700 hover:bg-indigo-500' : 'hover:bg-indigo-200 hover:text-gray-700 '} flex flex-nowrap gap-2 items-center border-b border-zinc-500 px-2 py-4 rounded-md transition-colors`}
                        >
                            <route.icon />
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