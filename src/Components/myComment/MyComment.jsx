"use client"
import Link from 'next/link';
import { GraduationCapIcon, StarIcon, MessageSquare, Trash2 } from 'lucide-react';
import MarkIcon from '../markIcon/MarkIcon';
import Image from 'next/image';
import { useUserCommentsStore } from '@/store/useUserCommentsStore';

function MyComment(props) {
    const { _id, ostadId: ostad, comment } = props    
    const setUComments = useUserCommentsStore(state => state.setComments)
    
    const degreesList = { diploma: 'دیپلم', associate: 'کاردانی', bachelor: 'کارشناسی', master: 'کارشناسی ارشد', PhD: 'دکترا' }
    const categoryList = { specialized: 'تخصصی', general: 'عمومی' }
    const ostadDegree = degreesList[ostad?.degree]
    const ostadcategory = categoryList[ostad?.category]

    const deleteComment = (event) => {
        event.preventDefault()
        const deleteCommentFunc = async () => {
            const res = await fetch(`/api/comments/${_id}`, {
                method: 'DELETE',
            })
            const data = await res.json()
            setUComments(data.userCommentsWithC_Count)
            console.log(data)
        }
        deleteCommentFunc()
    }

    return (
        <Link key={_id} href={`/ostad/${ostad?._id}`}>
            <div className='min-w-72 h-44 bg-gradient-to-br from-indigo-300 to-indigo-100 hover:bg-zinc-800 flex flex-col justify-between gap-2 p-3 rounded-md border border-zinc-300 transition-colors'>
                <div className='flex justify-between gap-2'>
                    <span className='flex flex-col gap-2 w-2/3'>
                        <h2 className='text-md md:text-lg font-bold'>استاد {ostad?.name}</h2>
                        <span className='bg-gradient-to-l from-zinc-100 p-2 h-full rounded-lg flex flex-col gap-2'>
                            <p className=' text-zinc-600 text-xs md:text-sm font-semibold line-clamp-3'><b className='font-bold text-sm'>کامنت شما:</b> {comment}</p>
                            <button
                                className='bg-zinc-300 text-zinc-700 rounded-full p-1 w-fit cursor-pointer flex justify-center items-center gap-2 hover:bg-red-500 hover:text-white transition-all hover:animate-pulse'
                                onClick={deleteComment}
                            >
                                حذف دیدگاه
                                <Trash2 />
                            </button>
                        </span>
                    </span>
                    <div className='w-1/3 relative flex justify-end'>
                        <Image
                            className='rounded-xl w-26 h-26 md:w-28 md:h-28 object-cover'
                            src={ostad?.image || "/images/defaultPerson.png"}
                            alt={`تصویر استاد ${ostad?.name}`}
                            width={100}
                            height={100}
                            loading='lazy'
                        />
                        <span className='absolute start-0 top-0 '>
                            <MarkIcon itemId={_id} type={'ostad'} />
                        </span>
                    </div>
                </div>
                <div>
                    <span className='relative text-zinc-600 text-xs flex justify-between'>
                        <span className='flex gap-4'>
                            <span className='font-medium flex items-center'>
                                <GraduationCapIcon size={14} />{ostadcategory}
                            </span>
                            <span className='font-medium flex items-center'>
                                <GraduationCapIcon size={14} />{ostadDegree}
                            </span>
                        </span>

                        <span className='flex gap-4'>
                            <span className='flex gap-1 font-medium'>
                                {ostad?.commentsCount}
                                <MessageSquare size={20} />
                            </span>
                            <span className='flex gap-1 font-medium'>
                                {ostad?.rate}
                                <StarIcon size={20} fill='yellow' color />
                            </span>
                        </span>
                    </span>
                </div>
            </div>
        </Link >
    )
}

export default MyComment