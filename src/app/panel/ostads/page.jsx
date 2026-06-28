'use client'
import DeleteBtn from '@/Components/deleteBtn/DeleteBtn'
import ItemBtn from '@/Components/itemBtn/ItemBtn'
import Loading from '@/Components/loading/Loading'
import { Edit2, EyeIcon, Star, StarIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function page() {
    const [ostads, setOstads] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getostads = async () => {
            const res = await fetch('/api/ostads')
            const data = await res.json()
            console.log(data);

            if (data.status == 200) {
                setOstads(data.ostads)
                console.log(data)
            } else {
            }
            setLoading(false)
        }
        getostads()
    }, [])
    return (
        <div className="w-full p-4">
            <h2 className="text-indigo-600 text-2xl font-bold mb-6">لیست اساتید</h2>
            {loading ?
                <Loading /> :
                <div className="bg-white shadow-md rounded-xl overflow-hidden border border-zinc-200">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-zinc-100 text-zinc-600 uppercase text-sm font-semibold">
                            <tr>
                                <th className="px-6 py-4">ردیف</th>
                                <th className="px-6 py-4">عکس</th>
                                <th className="px-6 py-4">نام</th>
                                <th className="px-6 py-4">بیوگرافی</th>
                                <th className="px-6 py-4">امتیاز</th>
                                <th className="px-6 py-4 text-center">اقدام‌ها</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                            {ostads.map((ostad, index) => (
                                <tr key={ostad._id} className="hover:bg-indigo-50 transition-colors">
                                    <td className="px-6 py-4 text-zinc-500 font-medium">{index + 1}</td>
                                    <td className="p-4 font-bold text-zinc-800">
                                        <Image
                                            className='w-5 h-5 md:w-12 md:h-12 object-cover rounded-full '
                                            src={ostad.image || "/images/defaultPerson.png"}
                                            alt={`تصویر استاد ${ostad.name}`}
                                            width={50}
                                            height={50}
                                            loading='lazy'
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-bold text-zinc-800">{ostad.name}</td>
                                    <td className="px-6 py-4 text-zinc-600 line-clamp-1">{ostad.biography}</td>
                                    <td className="px-6 py-4 text-zinc-600">
                                        <span className='flex gap-1 font-medium'>
                                            {ostad.rate}
                                            <StarIcon size={20} fill='yellow' color />
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <ItemBtn id={ostad._id} title={'بازدید'} type={'view'} src={''} Icon={EyeIcon} />
                                            <ItemBtn id={ostad._id} title={'ویرایش'} type={'edit'} src={''} Icon={Edit2} />
                                            <DeleteBtn deleteHandler={null} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default page
