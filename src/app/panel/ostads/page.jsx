'use client'
import DeleteBtn from '@/Components/deleteBtn/DeleteBtn'
import ItemBtn from '@/Components/itemBtn/ItemBtn'
import Loading from '@/Components/loading/Loading'
import { useOstadsStore } from '@/store/useOstadsStore'
import { Edit2, EyeIcon, Star, StarIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function page() {
    const ostads = useOstadsStore(state=> state.ostads)
    const setOstads = useOstadsStore(state => state.setOstads)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getostads = async () => {
            const res = await fetch('/api/ostads')
            const data = await res.json()
            if (data.status == 200) {
                setOstads(data.ostads)
            } else {
            }
            setLoading(false)
        }
        getostads()
    }, [])
    const deleteOstad = (event, itemId) => {
            event.preventDefault()            
            const deleteOstadFunc = async () => {
                const res = await fetch(`/api/ostads/${itemId}`, {
                    method: 'DELETE',
                })
                const data = await res.json()
                switch (data.status) {
                    case (200): {
                        setOstads(data.newList)
                        break
                    }
                    case (401): {
                        toast.error(data.error, { position: 'bottom-center' })
                        break
                    }
                    case (403): {
                        toast.error(data.error, { position: 'bottom-center' })
                        break
                    }
                    case (500): {
                        toast.error(data.error, { position: 'bottom-center' })
                        break
                    }
                    default: {
                        console.log(data);
                    }
                }
            }
            deleteOstadFunc()
        }
    return (
        <div className="w-full p-4">
            <h2 className="bg-blue-100 w-fit px-4 py-2 rounded-4xl text-[#0056AA] text-2xl font-bold mb-6 self-start">لیست استادها</h2>
            {loading ?
                <Loading /> :
                <div className="bg-zinc-800 shadow-md rounded-xl overflow-hidden ">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-zinc-900 text-zinc-400 uppercase text-sm font-semibold">
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
                                    <td className="px-6 py-4 font-bold  text-zinc-300">{ostad.name}</td>
                                    <td className="px-6 py-4 text-zinc-500 line-clamp-1">{ostad.biography}</td>
                                    <td className="px-6 py-4 text-zinc-500">
                                        <span className='flex gap-1 font-medium'>
                                            {ostad.rate.toFixed(1)}
                                            <StarIcon size={20} fill='yellow' color={'yellow'} />
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <ItemBtn id={ostad._id} title={'بازدید'} type={'view'} src={'/ostad'} Icon={EyeIcon} />
                                            <ItemBtn id={ostad._id} title={'ویرایش'} type={'edit'} src={'/panel/editOstad'} Icon={Edit2} />
                                            <DeleteBtn deleteHandler={(e) => deleteOstad(e, ostad._id)} />
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
