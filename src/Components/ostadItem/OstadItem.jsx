import Link from 'next/link';
import { MapPin, DollarSign, GraduationCapIcon, Star, StarIcon } from 'lucide-react';
import MarkIcon from '../markIcon/MarkIcon';
import Image from 'next/image';

function OstadItem({ ostad }) {

    const { _id, image, name, biography, degree, studyField, category, rate, startYear } = ostad

    const degreesList = { diploma: 'دیپلم', associate: 'کاردانی', bachelor: 'کارشناسی', master: 'کارشناسی ارشد', PhD: 'دکترا' }
    const categoryList = { specialized: 'تخصصی', general: 'عمومی' }
    const ostadDegree = degreesList[degree]
    const ostadcategory = categoryList[category]

    return (
        <>
            <Link key={_id} href={`/ostad/${_id}`}>
                <div className='bg-zinc-300 hover:bg-zinc-400 h-max flex justify-between gap-5 p-3 rounded-md border border-zinc-300 transition-colors'>
                    <div className='flex-1 flex flex-col justify-between'>
                        <span className='flex justify-between'>
                            <h2 className='text-lg font-semibold cursor-pointer'>استاد {name}</h2>
                            <h3 className='flex items-center text-sm font-medium'>
                                {rate}
                                <StarIcon size={20} fill='yellow' color />
                            </h3>
                        </span>
                        <p className=' text-zinc-600 cursor-pointer'>{biography.length > 40 ? biography?.slice(0, 40) + '...' : biography}</p>
                        <span className='text-zinc-600 flex justify-between'>
                            <h4 className='text-xs font-medium flex items-center '><GraduationCapIcon size={14} />{ostadDegree}</h4>
                            <h4 className='text-xs font-medium flex items-center '><GraduationCapIcon size={14} />{ostadcategory}</h4>
                        </span>
                    </div>
                    <div className='w-30 h-30 relative '>
                        <Image
                            className='rounded-xl cursor-pointer w-full h-full object-cover'
                            src={image || "/images/defaultPerson.png"}
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

export default OstadItem