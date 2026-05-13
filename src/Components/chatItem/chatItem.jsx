import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function chatItem({chat}) {
    const { chatId, productId, otherParticipantName, lastMsgText} = chat
    
    return (
        <Link href={`/panel/chat/${chatId}`} className='w-full h-36 p-5 flex justify-between bg-zinc-300 hover:bg-zinc-400 rounded-md cursor-pointer transition-colors'>
             <div className='flex-1 flex flex-col'>
                 <h3 className='font-bold text-lg'>{productId.title}</h3>
                 <div className='m-2'>
                     <h4 className='font-semibold text-gray-700'>{otherParticipantName}</h4>
                    <p className='text-gray-500'>{lastMsgText.length > 30 ? lastMsgText?.slice(0, 30) + '...' : lastMsgText}</p>
                 </div>
             </div>
            <Image
                className='rounded-xl cursor-pointer w-30 h-[80%] '
                src={productId.image || "/images/default.png"}
                alt='product image'
                width={500}
                height={300}
            />
        </Link>
    )
}

export default chatItem
