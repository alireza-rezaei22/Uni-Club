"use client"
import Loading from '@/Components/loading/Loading'
import PopUp from '@/Components/popUp/PopUp'
import { MessageSquareX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function chats() {
  const [userChats, setuserChats] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUserChats = async () => {
      const res = await fetch(`/api/chat`)
      if (res.ok) {
        const data = await res.json()
        setuserChats(data.userChats)
        setLoading(false)
      }
    }
    getUserChats()
  }, [])

  return (
    <>
      <h2 className='text-green-400 text-2xl font-bold self-start pb-3'>گفتوگوهای من</h2>
      <div className='h-full flex flex-col gap-3 p-2'>
        {
          loading ?
            <Loading /> :
            userChats.length ?
              userChats.map(chat => {
                return <Link key={chat._id} href={`/panel/chat/${chat.chatId}`} className='w-full h-40 md:h-44 p-5 flex justify-between bg-white border border-zinc-300 rounded-2xl cursor-pointer'>
                  <div className='flex-1 flex flex-col'>
                    <h3 className='font-bold text-lg'>{chat.productId.title}</h3>
                    <div className='m-2'>
                      <h4 className='font-semibold text-gray-700'>{chat.otherParticipantName}</h4>
                      <p className='text-gray-500'>{chat.lastMsgText.length > 30 ? chat.lastMsgText?.slice(0, 30) + '...' : chat.lastMsgText}</p>
                    </div>
                  </div>
                  <Image
                    className='rounded-xl cursor-pointer w-2/5 md:w-1/5 h-full '
                    src={chat.productId.image || "/images/default.png"}
                    alt='product image'
                    width={500}
                    height={300}
                  />
                </Link>
              }) :
              <PopUp Icon={MessageSquareX} msg={'هیچ گفتوگویی نداشته اید'} />
        }
      </div>
    </>
  )
}

export default chats