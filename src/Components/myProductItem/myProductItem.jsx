"use client"
import { Trash2 } from 'lucide-react';
import ProductDate from '../productDate/productDate';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import MarkIcon from '../markIcon/MarkIcon';
import { UseUProductsStore } from '@/store/useUProductsStore';
import Image from 'next/image';

function MyProductItem({ product }) {

    const { image, title, city, description, date, condition, price, _id: id } = product

    const conditionsList = { new: 'نو', as_new: 'درحدنو', worked: 'کارکرده' }
    const productCondition = conditionsList[condition]

    const userData = useAuthStore(state => state.user)
    const setUProducts = UseUProductsStore(state => state.setUProducts)
    const deleteProduct = (event) => {
        event.preventDefault()
        // prod
        const deleteProductFunc = async () => {
            if (userData) {

                const res = await fetch(`/api/products/${id}`, {
                    method: 'DELETE',
                })
                const data = await res.json()
                console.log(data);
                setUProducts(data)
            }
        }
        deleteProductFunc()
    }

    return (
        <>
            <Link key={id} href={`/product/${id}`} className='flex-1'>
                <div className='relative bg-zinc-300 hover:bg-zinc-400 h-40 flex justify-between gap-5 p-2 rounded-md'>
                    <div className='flex-1 flex flex-col justify-between'>
                        <h2 className='text-lg font-semibold cursor-pointer'>{title}</h2>
                        <p className=' text-zinc-600 cursor-pointer'>{description.length > 40 ? description?.slice(0, 40) + '...' : description}</p>
                        <span className='text-zinc-600 flex justify-between'>
                            <h4 className='text-xs font-medium'>{productCondition}</h4>
                            <h4 className='text-xs font-medium'>{price ? `${price.toLocaleString()} تومان` : 'توافقی'}</h4>
                        </span>
                        <span className='text-zinc-600 flex justify-between'>
                            {date && <ProductDate date={date} />}
                            <h4 className='text-xs font-medium'>{city}</h4>
                        </span>
                    </div>
                    <div className='w-30 h-30 relative'>
                        {/* {imageBase64 ? */}
                        <Image
                            className='rounded-xl cursor-pointer w-full h-[70%] object-cover'
                            src={image || "/images/default.png"}
                            alt='product image'
                            width={500}
                            height={300}
                        />

                        <span className='absolute -left-1 -top-1 '>
                            <MarkIcon productId={id} />
                        </span>
                    </div>
                    <button
                        className='absolute left-2 bottom-2 bg-zinc-300 text-zinc-700 rounded-full p-1 w-10 h-10 self-end cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white transition-all hover:animate-pulse'
                        onClick={deleteProduct}
                    >
                        <Trash2 />
                    </button>
                </div>
            </Link >
        </>
    )
}

export default MyProductItem