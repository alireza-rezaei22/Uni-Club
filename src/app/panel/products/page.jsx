'use client'
import DeleteBtn from '@/Components/deleteBtn/DeleteBtn'
import ItemBtn from '@/Components/itemBtn/ItemBtn'
import Loading from '@/Components/loading/Loading'
import { useProductsStore } from '@/store/uesProductsStore'
import { Edit2, EyeIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function page() {
    const [loading, setLoading] = useState(true)
    const products = useProductsStore(state => state.products)
    const setProducts = useProductsStore(state => state.setProducts)
    const categoryList = { food: 'غذا', book: 'کتاب و جزوه', house: 'املاک', digital: 'کالای دیجیتال', accessory: 'اکسسوری', other: 'سایر' }
    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch('/api/products')
            const data = await res.json()
            if (data.status == 200) {
                setProducts(data.products)
            } else {
            }
            setLoading(false)
        }
        getProducts()
    }, [])
    const deleteProduct = (event, itemId) => {
        event.preventDefault()        
        const deleteProductFunc = async () => {
            const res = await fetch(`/api/products/${itemId}`, {
                method: 'DELETE',
            })
            const data = await res.json()
            switch (data.status) {
                case (200): {
                    setProducts(data.newList)
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
        deleteProductFunc()
    }
    return (
        <div className="w-full p-4">
            <h2 className="bg-blue-100 w-fit px-4 py-2 rounded-4xl text-[#0056AA] text-2xl font-bold mb-6 self-start">لیست آگهی ها</h2>
            {loading ?
                <Loading /> :
                <div className="bg-zinc-800 shadow-md rounded-xl overflow-hidden">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-zinc-900 text-zinc-400 uppercase text-sm font-semibold">
                            <tr>
                                <th className="px-6 py-4">ردیف</th>
                                <th className="px-6 py-4">عکس</th>
                                <th className="px-6 py-4">عنوان</th>
                                <th className="px-6 py-4">توضیحات</th>
                                <th className="px-6 py-4">دسته بندی</th>
                                <th className="px-6 py-4">قیمت</th>
                                <th className="px-6 py-4 text-center">اقدام‌ها</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                            {products.map((product, index) => (
                                <tr key={product._id} className="hover:bg-indigo-50 transition-colors">
                                    <td className="px-6 py-4 text-zinc-500 font-medium">{index + 1}</td>
                                    <td className="p-4 font-bold text-zinc-800">
                                        <Image
                                            className='w-5 h-5 md:w-12 md:h-12 object-cover rounded-xl '
                                            src={product.image || "/images/default.png"}
                                            alt={`تصویر محصول ${product.title}`}
                                            width={50}
                                            height={50}
                                            loading='lazy'
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-bold text-zinc-300">{product.title}</td>
                                    <td className="px-6 py-4 text-zinc-500 line-clamp-1">{product.description || 'توضیحی ثبت نشده'}</td>
                                    <td className="px-6 py-4 text-zinc-500">{categoryList[product.category]}</td>
                                    <td className="px-6 py-4 text-zinc-500 line-clamp-1">{product.price ? product.price.toLocaleString() : 'توافقی'}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <ItemBtn id={product._id} title={'بازدید'} type={'view'} src={'/product'} Icon={EyeIcon} />
                                            {/* <ItemBtn id={product._id} title={'ویرایش'} type={'edit'} src={''} Icon={Edit2} /> */}
                                            <DeleteBtn deleteHandler={(e)=> deleteProduct(e, product._id)} />
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