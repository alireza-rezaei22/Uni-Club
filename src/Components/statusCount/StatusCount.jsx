import React from 'react'
import ProductItem from '../productItem/ProductItem'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

function StatusCount({ title, count, children, href }) {
    return (
        <div className='md:w-full lg:w-1/2 p-2 '>
            <div className='bg-gray-700 text-green-400 space-y-4 p-2 rounded-xl flex flex-col border border-zinc-500'>
                <div className='w-full flex justify-between '>
                    <h2 className='font-medium text-xl'>{title} : {count}</h2>
                    <Link href={href} className='flex text-sm font-medium text-green-500'>
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