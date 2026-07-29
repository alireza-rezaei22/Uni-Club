'use client'
import Link from 'next/link';
import { GraduationCapIcon, StarIcon, MessageSquare, Trash2Icon, PenIcon, EyeIcon } from 'lucide-react';
import MarkIcon from '../markIcon/MarkIcon';
import Image from 'next/image';
import { useUOstadsStore } from '@/store/useUOstadsStore';
import ItemBtn from '../itemBtn/ItemBtn';
import DeleteBtn from '../deleteBtn/DeleteBtn';

function MyOstad(props) {

    const { _id, image, name, degree, category, rate, commentsCount } = props

    const degreesList = { diploma: 'دیپلم', associate: 'کاردانی', bachelor: 'کارشناسی', master: 'کارشناسی ارشد', PhD: 'دکترا' }
    const categoryList = { specialized: 'تخصصی', general: 'عمومی' }
    const ostadDegree = degreesList[degree]
    const ostadcategory = categoryList[category]
    const setOstads = useUOstadsStore(state => state.setOstads)
    console.log(image);
    
    const deleteHandler = async () => {

        const res = await fetch(`/api/ostads/my/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const newOstads = await res.json()
        setOstads(newOstads.newList)
    }

    return (
        <div className='min-w-72 h-44  bg-zinc-900 hover:bg-zinc-800 flex flex-col justify-between gap-2 p-3 rounded-md border-2 border-[#0056AA] transition-colors'>
            <div className='flex justify-between gap-2'>
                <span className='flex flex-col justify-between gap-2 w-2/3'>
                    <h2 className='text-md text-zinc-400 md:text-lg font-bold'>استاد {name}</h2>
                    <span className='flex gap-1 flex-wrap'>
                        <DeleteBtn deleteHandler={deleteHandler} />
                        <ItemBtn id={_id} title={'ویرایش'} Icon={PenIcon} type={'edit'} src={'/panel/editOstad'} />
                        <ItemBtn id={_id} title={'بازدید'} Icon={EyeIcon} type={'view'} src={'/ostad'} />
                    </span>
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
    )
}

export default MyOstad