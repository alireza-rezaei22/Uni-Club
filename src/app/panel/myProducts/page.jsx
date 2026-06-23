"use client"
import Loading from '@/Components/loading/Loading'
import MyProductItem from '@/Components/myProductItem/myProductItem'
import PopUp from '@/Components/popUp/PopUp'
import { useAuthStore } from '@/store/useAuthStore'
import { UseUProductsStore } from '@/store/useUProductsStore'
import { ArrowUpToLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function myProducts() {
    const UserProductsStore = UseUProductsStore(state => state.UProducts)
    const setUserProductsStore = UseUProductsStore(state => state.setUProducts)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({ err: '', icon: null })

    useEffect(() => {

        const getUserProducts = async () => {
            try {
                const res = await fetch(`/api/products/my`)
                const data = await res.json()
                switch (data.status) {
                    case 200: {
                        setUserProductsStore(data.items)
                        break
                    }
                    case 403: {
                        setError({ err: data.error, icon: ArrowUpToLine })
                        break
                    }
                    case 500: {
                        setError({ err: data.error, icon: ArrowUpToLine })
                        break
                    }
                    default: {
                        setError({ err: 'خطای ناشناخته از سمت سرور', icon: ArrowUpToLine })
                    }
                }
            } catch {
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        if (UserProductsStore.length) {
            setLoading(false)
        } else {
            getUserProducts()
        }
    }, [UserProductsStore])
    return (
        <>
            <h2 className='text-indigo-400 text-2xl font-bold self-start mb-3'>آگهی های من</h2>
            <div className='w-full flex flex-wrap'>
                {
                    loading ?
                        <Loading />
                        :
                        UserProductsStore.length ?
                            UserProductsStore.map(prod => {
                                return <div key={prod._id} className='w-full md:w-1/2 p-2'>
                                    <MyProductItem product={prod} />
                                </div>
                            }) :
                            <PopUp Icon={error.icon} msg={error.err} />
                }
            </div>
        </>
    )
}

export default myProducts