import SideBar from '@/Components/sidebar/SideBar'
import { LogIn } from 'lucide-react'
import React from 'react'
import { cookies } from 'next/headers'
import Link from 'next/link'


async function Layout({ children }) {
    const userCookes = await cookies()
    const usertoken = userCookes.get('token')?.value
    return (
        <div className='flex flex-row mt-2'>
            <SideBar />
            <main className='hide-scrollbar flex flex-col w-full h-[90vh] bg-gray-600 rounded-xl md:mx-5 p-5 md:p-10 overflow-y-scroll'>
                {usertoken ?
                    <>
                        {children}
                    </> :
                    <Link
                        href={'/login-register'}
                        className='m-12 p-12 border flex flex-col justify-center items-center rounded-md'
                    >
                        <LogIn className='size-14' />
                        <span>ابتدا<span className='text-blue-400'> لاگین</span> کنید</span>
                    </Link>
                }
            </main>
        </div>
    )
}

export default Layout