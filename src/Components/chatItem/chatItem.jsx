import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function chatItem({ chat }) {
    const { chatId, productId : product, otherParticipantName, lastMsgText } = chat

    return (
        <Link href={`/panel/chat/${chatId}`} className='w-full h-44 p-5 flex justify-between  bg-zinc-900 hover:bg-zinc-800 rounded-md cursor-pointer border-2 border-[#0056AA] transition-colors'>
            <div className='flex-1 flex flex-col'>
                <h3 className='font-bold text-zinc-400 text-lg'>{product.title}</h3>
                <div className='m-2'>
                    <h4 className='font-semibold text-gray-700'>{otherParticipantName}</h4>
                    <p className='text-gray-500'>{lastMsgText.length > 30 ? lastMsgText?.slice(0, 30) + '...' : lastMsgText}</p>
                </div>
            </div>
            <Image
                className='rounded-xl w-26 h-26 md:w-28 md:h-28 object-cover'
                src={product.image || "/images/default.png"}
                alt={`تصویر ${product.title}`}
                width={100}
                height={100}
                loading='lazy'
            />
        </Link>
    )
}

export default chatItem
