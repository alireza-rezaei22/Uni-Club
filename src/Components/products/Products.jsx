"use client"
import React, { useEffect, useState } from 'react'
import ProductItem from "@/Components/productItem/ProductItem";
import { useProductsStore } from '@/store/uesProductsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { UseMarkStore } from '@/store/useMarkesStore';
import Loading from '../loading/Loading';
import { SearchX } from 'lucide-react';
import PopUp from '../popUp/PopUp';

export default function Products({productsList}) {
    const products = useProductsStore(state => state.products)
    const setProducts = useProductsStore(state => state.setProducts)
    const userData = useAuthStore(state => state.user)
    const [loading, setLoading] = useState(true)
    const productsmarked = UseMarkStore(state => state.marks)
    const setProductsMarked = UseMarkStore(state => state.setMarks)
    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch('/api/products')
            if (res.ok) {
                const apiProducts = await res.json()
                setProducts(apiProducts.reverse())               
                setLoading(false)
            }
        }
        if (!productsList || productsList.status !== 200){
            getProducts()
        }else{
            setProducts(productsList.products.reverse())
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        
        if (userData) {
            const getMarked = async () => {
                const res = await fetch(`/api/markProducts`)
                const data = await res.json()
                setProductsMarked(data.markedProductsItems)
            }
            getMarked()
        }
    }, [products, userData])

    return (
        <div className='flex-1 flex justify-center w-full'>
            {
                loading ?
                    <Loading />
                    :
                    <div className='flex flex-wrap items-start w-full h-full'>

                        {products.length ?
                            products.map(product => {
                                return <div key={product._id} className='w-full md:w-1/2 p-2'>
                                    <ProductItem product={product} />
                                </div>
                            }) :
                            <PopUp Icon={SearchX} msg={'هیچ محصولی یافت نشد'} />
                        }
                    </div>
            }
        </div>


    )
}
