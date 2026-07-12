"use client"
import { EyeIcon, GraduationCapIcon, MessageSquare, StarIcon, Trash2, Trash2Icon } from 'lucide-react';
import ItemDate from '../itemDate/ItemDate';
import Link from 'next/link';
import MarkIcon from '../markIcon/MarkIcon';
import { UseUProductsStore } from '@/store/useUProductsStore';
import Image from 'next/image';
import toast from 'react-hot-toast';
import ItemBtn from '../itemBtn/ItemBtn';
import DeleteBtn from '../deleteBtn/DeleteBtn';

function MyProductItem({ product }) {

    const { image, title, description, created_at, condition, price, _id: id } = product

    const conditionsList = { new: 'نو', as_new: 'درحدنو', worked: 'کارکرده' }
    const productCondition = conditionsList[condition]

    const setUProducts = UseUProductsStore(state => state.setUProducts)
    const deleteProduct = (event) => {
        event.preventDefault()
        const deleteProductFunc = async () => {
            const res = await fetch(`/api/products/my/${id}`, {
                method: 'DELETE',
            })
            const data = await res.json()
            switch (data.status) {
                case (200): {
                    setUProducts(data.newList)
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
        <>
            <div className='min-w-72 h-44 bg-gradient-to-br from-indigo-300 to-indigo-100 hover:bg-zinc-800 flex flex-col justify-between gap-2 p-3 rounded-md border border-zinc-300 transition-colors'>
                <div className='flex justify-between gap-2'>
                    <span className='flex flex-col justify-between gap-2 w-2/3'>
                        <h2 className='text-md md:text-lg font-bold'>{title}</h2>
                        <span className='flex gap-2'>
                            <DeleteBtn deleteHandler={deleteProduct} />
                            <ItemBtn id={id} title={'بازدید'} Icon={EyeIcon} type={'view'} src={'/product'} />
                        </span>
                    </span>
                    <div className='w-1/3 relative flex justify-end'>
                        <Image
                            className='rounded-xl w-26 h-26 md:w-28 md:h-28 object-cover'
                            src={image || "/images/default.png"}
                            alt={`تصویر ${title}`}
                            width={100}
                            height={100}
                            loading='lazy'
                        />
                        <span className='absolute end-0 top-0 '>
                            <MarkIcon itemId={id} type={'product'} />
                        </span>
                    </div>
                </div>
                <div>
                    <span className='text-zinc-600 text-xs flex justify-between'>
                        <span className='flex gap-4'>
                            <h4 className='text-xs font-medium'>{price ? `${price.toLocaleString()} تومان` : 'توافقی'}</h4>
                        </span>
                        <span className='flex gap-4'>
                            <span className='flex gap-1 font-medium'>
                                {productCondition}
                            </span>
                            <span className='flex gap-1 font-medium'>
                                <ItemDate date={created_at} />
                            </span>
                        </span>
                    </span>
                </div>
            </div>

        </>
    )
}

export default MyProductItem

// <Link key={id} href={`/product/${id}`} className='flex-1'>
// < div className = 'relative bg-zinc-300 hover:bg-zinc-400 h-40 flex justify-between gap-5 p-2 rounded-md' >
//                 <div className='flex-1 flex flex-col justify-between'>
//                     <h2 className='text-lg font-semibold cursor-pointer'>{title}</h2>
//                     <p className=' text-zinc-600 cursor-pointer'>{description.length > 40 ? description?.slice(0, 40) + '...' : description}</p>
//                     <span className='text-zinc-600 flex justify-between'>
//                         <h4 className='text-xs font-medium'>{productCondition}</h4>
//                         <h4 className='text-xs font-medium'>{price ? `${price.toLocaleString()} تومان` : 'توافقی'}</h4>
//                     </span>
//                     <span className='text-zinc-600 flex justify-between'>
//                         {created_at && <ItemDate date={created_at} />}
//                         <h4 className='text-xs font-medium'>{city}</h4>
//                     </span>
//                 </div>
//                 <div className='w-30 h-30 relative'>
//                     {/* {imageBase64 ? */}
//                     <Image
//                         className='rounded-xl cursor-pointer w-full h-[70%] object-cover'
//                         src={image || "/images/default.png"}
//                         alt='product image'
//                         width={500}
//                         height={300}
//                     />

//                     <span className='absolute -left-1 -top-1 '>
//                         <MarkIcon productId={id} />
//                     </span>
//                 </div>
//                 <button
//                     className='absolute left-2 bottom-2 bg-zinc-300 text-zinc-700 rounded-full p-1 w-10 h-10 self-end cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white transition-all hover:animate-pulse'
//                     onClick={deleteProduct}
//                 >
//                     <Trash2 />
//                 </button>
//             </div >
//         </Link >