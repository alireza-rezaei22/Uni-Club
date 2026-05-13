"use client"
import Loading from '@/Components/loading/Loading'
import MyProductItem from '@/Components/myProductItem/myProductItem'
import PopUp from '@/Components/popUp/PopUp'
import { useAuthStore } from '@/store/useAuthStore'
import { UseUProductsStore } from '@/store/useUProductsStore'
import { ArrowUpToLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function myProducts() {
    const [userProducts, setUserProducts] = useState([])
    const user = useAuthStore(state => state.user)
    const UserProductsStore = UseUProductsStore(state => state.UProducts)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getUserProducts = async () => {
            if (user.id) {
                const id = user.id
                try{
                    const res = await fetch(`/api/products/${id}`)
                    const prods = await res.json()
                    setUserProducts(prods)
                    setLoading(false)
                }catch{
                    setLoading(false)
                }
            }
        }
        if (UserProductsStore.length) {
            setUserProducts(UserProductsStore)
        } else {
            getUserProducts()
        }
    }, [user, UserProductsStore])
    return (
        <>
            <h2 className='text-green-400 text-2xl font-bold self-start mb-3'>آگهی های من</h2>
            <div className='w-full flex flex-wrap'>
                {
                    loading ?
                        <Loading />
                        :
                        userProducts.length ?
                            userProducts.map(prod => {
                                return <div key={prod._id} className='w-full lg:w-1/2 p-2 '>
                                    <div className='bg-zinc-300 hover:bg-zinc-400 h-fit p-2 rounded-md border border-gray-300'>
                                        <MyProductItem product={prod} />
                                    </div>
                                </div>
                            }) :
                            <PopUp Icon={ArrowUpToLine} msg={'هیچ محصولی منتشر نکرده اید'} />
                }
            </div>
        </>
    )
}

export default myProducts