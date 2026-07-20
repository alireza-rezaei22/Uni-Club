import SideBar from '@/Components/sidebar/SideBar'
import { LogIn } from 'lucide-react'
import React from 'react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'


async function Layout({ children }) {
    const userCookes = await cookies()
    const usertoken = userCookes.get('token')?.value
    return (
        <div className='flex flex-row mt-2'>
            <SideBar />
            <main className='hide-scrollbar flex flex-col w-full h-[90vh] bg-gray-800 rounded-xl md:mx-5 p-5 md:p-10 overflow-y-scroll'>
                {usertoken ?
                    <>
                        {children}
                    </> :
                    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                        <Image
                            alt='login required'
                            src={'/images/178457256805672.png'}
                            width={300}
                            height={300}
                            className='rounded-full'
                        />
                        <h1 className="text-6xl font-bold text-gray-800 my-4">
                            <LogIn className="inline size-14 mr-2" />
                        </h1>
                        <h2 className="text-2xl font-semibold text-gray-600 mb-6">
                            ابتدا <span className="text-blue-700">لاگین</span> کنید!
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-md">
                            برای دسترسی به پنل لطفا ابتدا وارد حساب کاربری خود شوید.
                        </p>

                        <Link
                            href="/login-register"
                            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-md"
                        >
                            ورود به حساب کاربری
                        </Link>
                    </div>
                }
            </main>
        </div>
    )
}

export default Layout