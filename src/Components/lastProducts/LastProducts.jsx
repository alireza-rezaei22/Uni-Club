import connectToDB from '@/configs/DB'
import React from 'react'
import Link from 'next/link'
import { CloudOffIcon } from 'lucide-react'
import productModel from '@/model/product'
import ProductItem from '../productItem/ProductItem'

export const revalidate = 30000
async function LastProducts() {
    try {
        await connectToDB()
        const lastItems = await productModel.find({}).sort({ created_at: -1 }).limit(4).lean()

        // const getItems = await Promise.all(
        //     lastItems.map(async (item) => {
        //         const count = await commentModel.countDocuments({ ostadId: item._id })
        //         return { ...item, commentsCount: count }
        //     })
        // )

        return (
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-900 w-full mt-5 p-2 rounded-md flex flex-col gap-1">
                <div className='flex justify-between text-sm md:text-xl items-center'>
                    <h3 className="font-semibold text-indigo-200">آخرین آگهی ها</h3>
                    <Link href='/products/' className="text-indigo-200 min-w-30 flex justify-center items-center cursor-pointer py-2 hover:bg-indigo-600 rounded-xl transition-colors">
                        مشاهده همه
                    </Link>
                </div>
                <div className="flex gap-2 overflow-x-auto px-2">
                    {lastItems.map(item => (
                        <ProductItem key={item._id} product={item} />
                    ))}
                </div>
            </div>
        )
    } catch {
        return (
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-900 w-full mt-5 p-2 rounded-md flex flex-col gap-1">
                <div className='flex justify-between text-sm md:text-xl items-center'>
                    <h3 className="font-semibold text-indigo-200">آخرین آگهی ها</h3>
                    <Link href='/products/' className="text-indigo-200 min-w-30 flex justify-center items-center cursor-pointer py-2 hover:bg-indigo-600 rounded-xl transition-colors">
                        مشاهده همه
                    </Link>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 text-white p-2">
                    <CloudOffIcon size={42}/>
                    <span>
                        اشکالی در دریافت رخ داد
                    </span>
                </div>
            </div>
        )
    }
}

export default LastProducts