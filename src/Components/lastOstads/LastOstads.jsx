import connectToDB from '@/configs/DB'
import ostadModel from '@/model/ostad'
import React from 'react'
import OstadItem from '../ostadItem/OstadItem'

export const revalidate = 30000
async function LastOstads() {
    await connectToDB()
    const lastItems = await ostadModel.find({}).sort({ created_at: -1 }).limit(4).lean()
    console.log(lastItems);

    return (
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-900 w-full mt-10 p-2 rounded-md flex flex-col gap-3">
            <div className='flex justify-between items-center'>
                <h3 className="font-semibold text-xl text-indigo-200 md:text-2xl">آخرین اساتید</h3>
                <a href='/ostads/' className="text-indigo-200 min-w-30 flex justify-center items-center cursor-pointer py-2 hover:bg-indigo-600 rounded-xl transition-colors">
                    مشاهده همه
                </a>
            </div>
            <div className="flex gap-2 overflow-x-auto">
                {lastItems.map(item => {
                    return <OstadItem key={item._id} ostad={item} />
                })}
            </div>
        </div>
    )
}

export default LastOstads