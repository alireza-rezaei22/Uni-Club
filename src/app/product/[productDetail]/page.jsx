import productModel from '@/model/product'
import ItemDate from '@/Components/itemDate/ItemDate'
import ShowMap from '@/Components/map/showMap'
import Link from 'next/link'
import MarkIcon from '@/Components/markIcon/MarkIcon'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import Image from 'next/image'

export default async function page({ params }) {
    const { productDetail: productId } = params

    const product = await productModel.findById(productId)
    const { image, title, description, created_at, condition, price } = product
    const conditionsList = { new: 'نو', as_new: 'درحدنو', worked: 'کارکرده' }
    const productCondition = conditionsList[condition]
    const userToken = (await cookies()).get('token')
    const token = userToken?.value
    let userInfo = null
    let isUserPOwner = false
    if (token) {
        userInfo = verify(token, process.env.ACCESSTOKEN_SECRETKEY)
        isUserPOwner = userInfo.id == product.ownerId
    }

    return (
        <>
            <div
                className='p-5 mb-12 space-y-2 text-zinc-200
                    md:grid grid-cols-5 gap-5 md:mx-[5%]
                '>

                <Image
                    className='w-full max-w-130 max-h-96 col-start-4 col-end-6 m-auto rounded-xl'
                    src={image || "/images/default.png"}
                    alt='product image'
                    width={500}
                    height={300}
                />
                <div className='h-fit row-start-1 row-end-4 col-start-1 col-end-4 p-2'>
                    <h2 className='text-lg md:text-2xl font-bold md:mb-5'>{title}</h2>
                    <h2 className='text-lg md:text-xl md:font-semibold md:mb-1'>توضیحات:</h2>
                    <p className='p-2 text-sm md:text-lg whitespace-pre-line'>{description || 'توضیحی ثبت نشده'}</p>
                    <span className='flex flex-col md:flex-row justify-between items-start my-5 gap-1 '>
                        <h4 className='font-medium'>وضعیت: {productCondition}</h4>
                        <h4 className='font-medium'>قیمت: {price ? `${Number(price).toLocaleString()} تومان` : 'توافقی'}</h4>
                        <span className='w-full md:w-fit flex justify-between items-center gap-2'>
                            <ItemDate date={created_at} />
                            <MarkIcon itemId={productId} type={'product'} />
                        </span>
                    </span>
                </div>

                {product.location?.length == 2 &&
                    <span className='col-start-4 col-end-6 bg-amber-900 w-full h-64 block'>
                        <ShowMap
                            location={product.location}
                            className='rounded=md'
                        />
                    </span>
                }
                <Link href={`/panel/${isUserPOwner ? 'myProducts' : `chat/${productId}`}`} className='col-start-4 col-end-6'>
                    <button className='w-full bg-green-600 text-white my-2 p-2 rounded-md cursor-pointer'>{isUserPOwner ? 'دیدن آگهی های من' : 'گفتوگو'}</button>
                </Link>
            </div>
        </>
    )
}
