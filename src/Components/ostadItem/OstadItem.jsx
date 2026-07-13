import Link from 'next/link';
import { GraduationCapIcon, StarIcon, MessageSquare } from 'lucide-react';
import MarkIcon from '../markIcon/MarkIcon';
import Image from 'next/image';

function OstadItem({ ostad, commentsCount }) {

    const { _id, image, name, biography, degree, studyField, category, rate, startYear } = ostad
    
    const degreesList = { diploma: 'دیپلم', associate: 'کاردانی', bachelor: 'کارشناسی', master: 'کارشناسی ارشد', PhD: 'دکترا' }
    const categoryList = { specialized: 'تخصصی', general: 'عمومی' }
    const ostadDegree = degreesList[degree]
    const ostadcategory = categoryList[category]

    return (
        <Link key={_id} href={`/ostad/${_id}`}>
            <div className='min-w-72 h-44 bg-zinc-900 hover:bg-zinc-800 flex flex-col justify-between gap-2 p-3 rounded-md border-2 border-[#0056AA] transition-colors'>
                <div className='flex justify-between gap-2'>
                    <span className='flex flex-col gap-2 w-2/3'>
                        <h2 className='text-md text-zinc-400 md:text-lg font-bold'>استاد {name}</h2>
                        <p className=' text-zinc-600 text-xs md:text-sm font-semibold line-clamp-3'>{biography}</p>
                    </span>
                    <div className='w-1/3 relative flex justify-end'>
                        <Image
                            className='rounded-xl w-26 h-26 md:w-28 md:h-28 object-cover'
                            src={image || "/images/defaultPerson.png"}
                            alt={`تصویر استاد ${name}`}
                            width={100}
                            height={100}
                            loading='lazy'
                        />
                        <span className='absolute end-0 top-0 '>
                            <MarkIcon itemId={_id} type={'ostad'} />
                        </span>
                    </div>
                </div>
                <div>
                    <span className='text-zinc-500 text-xs flex justify-between'>
                        <span className='flex gap-4 items-center justify-center'>
                            <span className='font-medium flex gap-1'>
                                <GraduationCapIcon size={14} />{ostadcategory}
                            </span>
                            <span className='font-medium flex gap-1'>
                                <GraduationCapIcon size={14} />{ostadDegree}
                            </span>
                        </span>
                        <span className='flex items-center gap-4'>
                            <span className='flex gap-1 items-center'>
                                <p>{commentsCount}</p>
                                <MessageSquare size={20} />
                            </span>
                            <span className='flex gap-1 items-center'>
                                <p>{rate.toFixed(1)}</p>
                                <StarIcon size={20} fill='yellow' color={'yellow'} />
                            </span>
                        </span>
                    </span>
                </div>
            </div>
        </Link >
    )
}

export default OstadItem