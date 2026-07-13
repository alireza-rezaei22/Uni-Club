import React from 'react'
import ProductItem from '../productItem/ProductItem'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

function StatusCount({ title, count, children, href }) {
    return (
        <div className='md:w-full lg:w-1/2 p-2 '>
            <div className='bg-gray-700 text-[#0056AA] font-bold space-y-4 p-2 rounded-xl flex flex-col'>
                <div className='w-full flex justify-between '>
                    <h2 className='font-medium text-xl'>{title} : {count}</h2>
                    <Link href={href} className='flex items-center text-sm font-medium text-indogo-500'>
                        مشاهده
                        <ChevronLeft />
                    </Link>
                </div>
                <div className='space-y-2'>
                    <div>آخرین: </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default StatusCount