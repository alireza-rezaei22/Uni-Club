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
            <div className='min-w-72 h-44  bg-zinc-900 hover:bg-zinc-800 flex flex-col justify-between gap-2 p-3 rounded-md border-2 border-[#0056AA] transition-colors'>
                <div className='flex justify-between gap-2'>
                    <span className='flex flex-col justify-between gap-2 w-2/3'>
                        <h2 className='text-md text-zinc-400 md:text-lg font-bold'>{title}</h2>
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
                    <span className='text-zinc-500 text-sm flex justify-between font-medium'>
                        <span className='flex gap-4'>
                            <h4 className=''>{price ? `${price.toLocaleString()} تومان` : 'توافقی'}</h4>
                        </span>
                        <span className='flex gap-4'>
                            <span className='flex gap-1'>
                                {productCondition}
                            </span>
                            <span className='flex gap-1'>
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