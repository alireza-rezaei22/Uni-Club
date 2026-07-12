import Link from 'next/link'
import MarkIcon from '@/Components/markIcon/MarkIcon'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import Image from 'next/image'
import Comments from '@/Components/comments/comments'
import { BookCopy, Clock, GraduationCapIcon, PenToolIcon, StarIcon, UserSquare } from 'lucide-react'
import Rating from '@/Components/rating/Rating'
import ostadModel from '@/model/ostad'
import commentModel from '@/model/comment'
import userModel from '@/model/user'
import connectToDB from '@/configs/DB'
import ItemDate from '@/Components/itemDate/ItemDate'

export default async function Ostad({ params }) {
    const { ostadInfo: ostadId } = params
    await connectToDB()
    const ostad = await ostadModel.findById(ostadId)
    const rawComments = await commentModel.find({ ostadId }).populate({ path: 'userId', select: 'name -_id' }).select('userId comment')
    console.log(rawComments);

    const comments = rawComments.map(c => ({
        _id: c._id.toString(),
        comment: c.comment,
        userName: c.userId?.name || 'کاربر حذف شده',
    }))

    const degreesList = { diploma: 'دیپلم', associate: 'کاردانی', bachelor: 'کارشناسی', master: 'کارشناسی ارشد', PhD: 'دکترا' }
    const categoryList = { specialized: 'تخصصی', general: 'عمومی' }

    const { image, name, biography, degree, studyField, category, courses, rate, startYear, created_at, updated_at } = ostad
    const ostadDegree = degreesList[degree]
    const ostadcategory = categoryList[category]
    const userToken = (await cookies()).get('token')
    const token = userToken?.value
    let userInfo = null
    let isUserPOwner = false
    if (token) {
        userInfo = verify(token, process.env.ACCESSTOKEN_SECRETKEY)
    }

    return (
        <>
            <div
                className='p-5 mb-12 space-y-2 text-zinc-200
                    md:flex flex-col gap-5 md:mx-[5%]
                '>
                <div className='flex flex-col md:gap-10 md:flex-row md:items-center justify-center'>
                    <Image
                        className='w-48 max-w-64 h-48 max-h-64 m-auto rounded-full'
                        src={image || "/images/defaultPerson.png"}
                        alt='ostad picture'
                        width={300}
                        height={300}
                    />
                    <span className='md:self-end flex-1 flex flex-col  justify-between items-start my-5 gap-1 '>
                        <h2 className='text-2xl font-bold md:mb-5'>استاد {name}</h2>
                        <span className='flex gap-2 items-center'>
                            <GraduationCapIcon />
                            <h4 className='font-medium'>مدرک تحصیلی: {ostadDegree}</h4>
                        </span>
                        <span className='flex gap-2 items-center'>
                            <GraduationCapIcon />
                            <h4 className='font-medium'>رشته تحصیلی: {studyField || 'مشخص نشده'}</h4>
                        </span>
                        <span className='flex gap-2 items-center'>
                            <GraduationCapIcon />
                            <h4 className='font-medium'>نوع دروس: {ostadcategory}</h4>
                        </span>


                        <span className='w-full flex justify-between items-center gap-2'>

                            <span className='flex gap-2 items-center'>
                                <PenToolIcon />
                                <h4 className='font-medium'>تاریخ شروع فعالیت: {startYear == -1 ? 'مشخص نشده' : startYear == 0 ? 'پیش از 1395' : startYear}</h4>
                            </span>
                            <MarkIcon itemId={ostadId} type={'ostad'} />
                        </span>
                        <span className='w-full  flex justify-between items-center gap-2'>
                            <span className='flex gap-2 items-end'>
                                <Clock />
                                <h4 className='font-medium'>آخرین بروز رسانی:
                                </h4>
                                <ItemDate date={updated_at || created_at} />
                            </span>
                            <h4 className='font-medium flex'>
                                امتیاز: {rate}
                                <StarIcon fill='yellow' color={'yellow'} />
                            </h4>
                        </span>
                    </span>
                </div>

                <div className='h-fit row-start-1 row-end-4 col-start-1 col-end-4 p-2'>
                    <div className='my-5 md:my-12'>
                        <span className='flex gap-2 items-center'>
                            <UserSquare />
                            <h2 className='text-xl font-bold md:mb-1'>بیوگرافی:</h2>
                        </span>
                        <p className='px-4 text-sm md:text-lg whitespace-pre-line'>{biography || 'توضیحی ثبت نشده'}</p>
                    </div>
                    <div className='flex flex-col gap-2 mb-12 justify-between'>

                        <span className='flex gap-2 items-center'>
                            <BookCopy />
                            <h3 className='text-lg font-bold'>استاد {name} این درس ها را ارایه می کند:</h3>
                        </span>
                        <ul className='px-10 list-disc'>
                            {courses.length ? courses.map((course, index) => {
                                return (
                                    <li key={index}>{course.name} روز {course.day} از ساعت {course.startTime} تا {course.endTime} در {course.classLocation}</li>
                                )
                            }) :
                                <li>درسی برای استاد {name} تعریف نشده</li>
                            }
                        </ul>
                    </div>

                    <div className='flex flex-col md:flex-row gap-2 mb-12 justify-between'>
                        <h2 className='text-lg md:text-xl md:font-semibold md:mb-1'>شما به استاد {name} چه امتیازی می دهید؟</h2>
                        <Rating initalRate={rate} userId={userInfo?.id} ostadId={ostadId} />
                    </div>
                    <Comments initComments={comments} ostadId={ostadId} />
                </div>
                <Link href={`/panel/${isUserPOwner ? 'myProducts' : `chat/${ostadId}`}`} className='col-start-4 col-end-6'>
                    <button className='w-full bg-green-600 text-white my-2 p-2 rounded-md cursor-pointer'>ارتباط با استاد</button>
                </Link>
            </div>
        </>
    )
}
