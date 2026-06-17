import itemDate from '../itemDate/ItemDate';
import Link from 'next/link';
import { MapPin, DollarSign } from 'lucide-react';
import MarkIcon from '../markIcon/MarkIcon';
import Image from 'next/image';

function ProductItem({ product }) {

    const { image, title, city, description, date, condition, price, _id } = product

    const conditionsList = { new: 'نو', as_new: 'درحدنو', worked: 'کارکرده' }
    const productCondition = conditionsList[condition]

    return (
        <>
            <Link key={_id} href={`/product/${_id}`}>
                <div className='bg-zinc-300 hover:bg-zinc-400 h-max flex justify-between gap-5 p-3 rounded-md border border-zinc-300 transition-colors'>
                    <div className='flex-1 flex flex-col justify-between'>
                        <h2 className='text-lg font-semibold cursor-pointer'>{title}</h2>
                        <p className=' text-zinc-600 cursor-pointer'>{description.length > 40 ? description?.slice(0, 40) + '...' : description}</p>
                        <span className='text-zinc-600 flex justify-between'>
                            <h4 className='text-xs font-medium'>{productCondition}</h4>
                            <h4 className='text-xs font-medium flex items-center '><MapPin size={14} />{city}</h4>
                        </span>
                        <span className='text-zinc-600 flex justify-between'>
                            <span className='flex items-center'>
                                {price ?
                                    <>
                                        <DollarSign size={14} />
                                        <h4 className='text-xs font-medium'>
                                            {price.toLocaleString()} تومان
                                        </h4>
                                    </>
                                    :
                                    <h4 className='text-xs font-medium'>توافقی</h4>
                                }
                            </span>

                            <itemDate date={date} />
                        </span>
                    </div>
                    <div className='w-30 h-30 relative '>
                        <Image
                            className='rounded-xl cursor-pointer w-full h-[70%] object-cover'
                            src={image || "/images/default.png"}
                            alt='product image'
                            width={500}
                            height={300}
                        />
                        <span className='absolute left-0 top-0 '>
                            <MarkIcon productId={_id} />
                        </span>
                    </div>
                </div>
            </Link >
        </>
    )
}

export default ProductItem