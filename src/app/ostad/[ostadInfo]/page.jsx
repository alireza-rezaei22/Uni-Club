// import productModel from '@/model/product'
import ProductDate from '@/Components/productDate/productDate'
import ShowMap from '@/Components/map/showMap'
import Link from 'next/link'
import MarkIcon from '@/Components/markIcon/MarkIcon'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import Image from 'next/image'
import Comments from '@/Components/comments/comentns'
import toast from 'react-hot-toast'
import { BookOpenTextIcon, Clock, GraduationCapIcon, PenToolIcon, StarIcon, Timer, User2, UserSquare } from 'lucide-react'
import Rating from '@/Components/rating/Rating'
import ostadModel from '@/model/ostad'

export default async function Ostad({ params }) {
    const { ostadInfo: ostadId } = params

    const ostad = await ostadModel.findById(ostadId)
    // console.log(ostad);
    const degreesList = { diploma: 'دیپلم', associate: 'کاردانی', bachelor: 'کارشناسی', master: 'کارشناسی ارشد', PhD: 'دکترا' }
    const categoryList = { specialized: 'تخصصی', general: 'عمومی' }

    // const ostad = {
    //     image: '',
    //     name: 'مرتضی بهرامی',
    //     biography: 'استاد مرتضی بهرامی فارق التحصیل مقطع کارشناسی ارشد رشته هوش مصنوعی از دانشگاه بوعلی سینا هستند. ایشان از سال 1401 در دانشکده جباریان مشغول تدریس هستند و درس هایی نظیر ساختمان داده، هوش مصنوعی، آزمانیشگاه هوش مصنوعی را تدریس می کنند. ',
    //     degree: 'کارشناسی ارشد',
    //     courses: ['هوش مصنوعی', 'آزمایشگاه هوش مصنوعی', 'ساختمان داده', 'داده کاوی'],
    //     attendanceDates: [
    //         { day: 'یکشنبه', time: [14, 17] },
    //         { day: 'چهارشنبه', time: [15, 20] }
    //     ],
    //     date: 'test',
    //     condition: 'test',
    //     price: 'test',
    //     jobStartDate: '2022-02-21',
    //     rate: 4.5
    // }
    const { image, name, biography, degree, studyField, category, courses, rate, startYear, created_at } = ostad
    const ostadDegree = degreesList[degree]
    const ostadcategory = categoryList[category]
    const userToken = (await cookies()).get('token')
    const token = userToken?.value
    let userInfo = null
    let isUserPOwner = false
    // let userId = null
    if (token) {
        userInfo = verify(token, process.env.ACCESSTOKEN_SECRETKEY)
        // isUserPOwner = userInfo.id == product.ownerId
        // userId = userInfo._id
        // console.log(userInfo);
        
    }

    return (
        <>
            <div
                className='p-5 mb-12 space-y-2 text-zinc-200
                    md:flex flex-col gap-5 md:mx-[5%]
                '>
                <div className='flex gap-10 items-center justify-center'>
                    <Image
                        className='w-48 max-w-64 h-48 max-h-64 m-auto rounded-full'
                        src={image || "/images/defaultPerson.png"}
                        alt='product image'
                        width={300}
                        height={300}
                    />
                    <span className='self-end flex-1 flex flex-col  justify-between items-start my-5 gap-1 '>
                        <h2 className='text-lg md:text-2xl font-bold md:mb-5'>استاد {name}</h2>
                        <span className='flex gap-2'>
                            <GraduationCapIcon />
                            <h4 className='font-medium'>مدرک: {ostadDegree}</h4>
                        </span>
                        <span className='flex gap-2'>
                            <GraduationCapIcon />
                            <h4 className='font-medium'>رشته تحصیلی: {studyField || 'مشخض نشده'}</h4>
                        </span>
                        <span className='flex gap-2'>
                            <GraduationCapIcon />
                            <h4 className='font-medium'>نوع دروس: {ostadcategory}</h4>
                        </span>


                        <span className='w-full flex justify-between items-center gap-2'>

                            <span className='flex gap-2'>
                                <PenToolIcon />
                                <h4 className='font-medium'>تاریخ شروع فعالیت: {startYear || 'مشخض نشده'}</h4>
                            </span>
                            <MarkIcon productId={ostadId} />
                        </span>
                        <span className='w-full  flex justify-between items-center gap-2'>
                            <span className='flex gap-2'>
                                <Clock />
                                <h4 className='font-medium'>آخرین بروز رسانی: {created_at.toLocal}</h4>
                            </span>
                            <h4 className='font-medium flex'>
                                امتیاز: {rate}
                                <StarIcon fill='yellow' color />
                            </h4>
                        </span>
                    </span>
                    {/* </span> */}
                </div>

                <div className='h-fit row-start-1 row-end-4 col-start-1 col-end-4 p-2'>
                    <div className='my-5 md:my-12'>
                        <span className='flex gap-2'>
                            <UserSquare />
                            <h2 className='text-lg md:text-xl md:font-semibold md:mb-1'>بیوگرافی:</h2>
                        </span>
                        <p className='p-2 text-sm md:text-lg whitespace-pre-line'>{biography || 'توضیحی ثبت نشده'}</p>
                    </div>
                    <div className='flex flex-col gap-2 mb-12 justify-between'>

                        <span className='flex gap-2'>
                            <BookOpenTextIcon />
                            <h4 className='font-medium'>استاد {name} این درس ها را ارایه می کند:</h4>
                        </span>
                        {courses.map((date, index) => {
                            return (
                                <div key={index} className='flex gap-2'>
                                    <h4>{date.name}</h4>
                                    <h4>{date.day}</h4>
                                    <h4>از ساعت {date.startTime} تا {date.endTime}</h4>
                                </div>
                            )
                        })}
                    </div>

                    <div className='flex flex-col md:flex-row gap-2 mb-12 justify-between'>
                        <h2 className='text-lg md:text-xl md:font-semibold md:mb-1'>شما به استاد {name} چه امتیازی می دهید؟</h2>
                        <Rating initalRate={rate} userId={userInfo?.id} ostadId={ostadId}  />
                    </div>
                    <Comments />
                </div>

                {/* {product.location?.length == 2 &&
                    <span className='col-start-4 col-end-6 bg-amber-900 w-full h-64 block'>
                        <ShowMap
                            location={product.location}
                            className='rounded=md'
                        />
                    </span>
                } */}
                <Link href={`/panel/${isUserPOwner ? 'myProducts' : `chat/${ostadId}`}`} className='col-start-4 col-end-6'>
                    {/* <Link onClick={()=> toast.error('در حال حاضر این کار قابل انجام نیست', {position:'bottom-center'})} className='col-start-4 col-end-6'> */}
                    {/* <button className='w-full bg-green-600 text-white my-2 p-2 rounded-md cursor-pointer'>{isUserPOwner ? 'دیدن آگهی های من' : 'گفتوگو'}</button> */}
                    <button className='w-full bg-green-600 text-white my-2 p-2 rounded-md cursor-pointer'>ارتباط با استاد</button>
                </Link>
            </div>
        </>
    )
}
