import ItemDate from '../itemDate/ItemDate';
import Link from 'next/link';
import { MapPin, DollarSign } from 'lucide-react';
import MarkIcon from '../markIcon/MarkIcon';
import Image from 'next/image';

function ProductItem({ product }) {
    const { image, title, city, description, created_at, condition, price, _id } = product

    const conditionsList = { new: 'نو', as_new: 'درحدنو', worked: 'کارکرده' }
    const productCondition = conditionsList[condition]

    return (
        <Link key={_id} href={`/product/${_id}`}>
            <div className='min-w-72 h-44 bg-gradient-to-br from-indigo-300 to-indigo-100 hover:bg-zinc-800 flex flex-col justify-between gap-2 p-3 rounded-md border border-zinc-300 transition-colors'>
                <div className='flex justify-between gap-2'>
                    <span className='flex flex-col justify-between gap-2 w-2/3'>
                        <h2 className='text-md md:text-lg font-bold'>{title}</h2>
                        <p className=' text-zinc-600 text-xs md:text-sm font-semibold line-clamp-3'>{description}</p>
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
                            <MarkIcon itemId={_id} type={'product'} />
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
        </Link>
    )
}

export default ProductItem