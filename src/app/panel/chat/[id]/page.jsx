'use client'
import { Mic, SendHorizontal, Smile, MessageSquare, Check } from "lucide-react"
import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from "@/store/useAuthStore"
import { useParams } from "next/navigation"
import PopUp from "@/Components/popUp/PopUp"
import Image from "next/image"
import { supabase } from "@/utils/supabaseClient"

function Chat() {
  const params = useParams();
  const id = params.id;
  const userInfo = useAuthStore(state => state.user)
  const messagesEndRef = useRef(null);
  const [product, setProduct] = useState('')
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [readyMsgs, setReadyMsgs] = useState([])
  const conditionsList = { new: 'نو', as_new: 'درحدنو', worked: 'کارکرده' }
  const BuyerMsgs = [
    'سلام',
    'موجوده؟',
    'تخفیف داره؟',
    'امکان بازدید داره؟',
    'معاوضه می کنید؟',
    'سالمه؟',
  ]
  const SellerMsgs = [
    'سلام',
    'بله',
    'خیر',
    'با چی؟',
    'فروختم',
    'تو آگهی هست',
    'پای معامله تخفیف هم میدم',
    'بهتون اطلاع میدم',
  ]
  const handleSend = async (event) => {
    event.preventDefault()
    const res = await fetch(`/api/chat/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatId,
        newMessage
      })
    })
    const data = await res.json()

    if (data.status === 201) {
      setNewMessage('')
      const newMsgObj = data.chatMsgs[data.chatMsgs.length - 1];
      setMessages((prev) => [...prev, newMsgObj]);

      supabase.channel(`chat-${chatId}`).send({
        type: 'broadcast',
        event: 'new-message',
        payload: data.chatMsgs[data.chatMsgs.length - 1]
      })
    }
  }

  useEffect(() => {
    let channel;
    const fetchInitialData = async () => {
      const res = await fetch(`/api/chat/${id}`);
      const data = await res.json();

      if (data) {
        setProduct(data.product);
        data.product.ownerId._id == userInfo?.id ? setReadyMsgs(SellerMsgs) : setReadyMsgs(BuyerMsgs)
        setChatId(data.chatId);
        if (data.chatMsgs) {
          setMessages(data.chatMsgs);
        }
      }
    };

    fetchInitialData();

    if (chatId) {
      channel = supabase
        .channel(`chat-${chatId}`)
        .on('broadcast', { event: 'new-message' }, (payload) => {
          setMessages((prev) => [...prev, payload.payload]);
        })
        .subscribe();
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [id, chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  }, [messages]);

  return (
    <>
      <div className=" bg-white w-full p-2 rounded-xl flex justify-between">
        <div className='p-2 flex-1 flex flex-col justify-between'>
          <h3 className='font-bold text-lg'>{product?.ownerId?.name}</h3>
          <div>
            <h4 className='font-semibold text-gray-700'>{product?.title}</h4>
            <p className='text-gray-500 text-sm'>قیمت: {product?.price ? product?.price.toLocaleString() + ' تومان' : 'توافقی'}</p>
          </div>
          <h5 className='text-gray-500 text-sm'>وضعیت: {conditionsList[product?.condition]}</h5>
        </div>
        <Image
          className='rounded-xl cursor-pointer w-30 h-30 object-cover'
          src={product?.image || "/images/default.png"}
          alt='product image'
          width={500}
          height={300}
        />
      </div>
      <div className='h-[80%] flex flex-col justify-end items-center'>
        <div className='w-full max-w-6xl flex flex-col items-center gap-3 p-2 overflow-y-scroll hide-scrollbar'>
          {messages.length < 1 ?
            <PopUp Icon={MessageSquare} msg={'پیامی ارسال کنید ...'} />
            :
            messages.map(msg => {
              return <div key={msg._id} className={`${msg.senderId === userInfo?.id ? 'bg-green-400 self-start rounded-br-sm' : 'bg-yellow-300 self-end rounded-bl-sm'} w-fit max-w-3/4 p-2 rounded-2xl`}>
                <p>{msg.text}</p>
                <span className={`text-zinc-700 text-xs w-full font-medium flex items-center gap-1 ${msg.sender === 'me' ? 'flex-row self-start' : 'flex-row-reverse self-end'}`}>

                  <Check size={14} />
                  <p>
                    {new Date(msg.createdAt).toLocaleTimeString().slice(0, 5)}
                  </p>
                </span>
              </div>
            })}
          <div ref={messagesEndRef} />
        </div>
        <div className="w-full ">

          <div className="flex gap-1 p-1 w-full h-max overflow-x-scroll hide-scrollbar">
            {readyMsgs.map(msg => {
              return <span
                className="w-fit h-fit text-nowrap border-2 border-zinc-300 p-2 rounded-full text-zinc-300 cursor-pointer hover:bg-zinc-600 transition-colors flex"
                onClick={() => setNewMessage(msg)}>
                {msg}
              </span>
            })}
          </div>
          <form
            onSubmit={handleSend}
            className='bg-white w-full max-w-6xl h-16 flex items-center gap-1 p-2 border border-gray-200 rounded-2xl shadow-sm mb-10 md:mb-0'
          >
            {newMessage ? (
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <SendHorizontal size={20} />
              </button>
            ) : (
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Mic size={20} />
              </button>
            )}

            <input
              type="hidden"
              value={chatId || ''}
              name="chatId"
            />
            <input
              type="text"
              value={newMessage || ''}
              onChange={(e) => setNewMessage(e.target.value)}
              name="newMessage"
              placeholder="پیام خود را بنویسید..."
              className="flex-1 py-2 outline-none text-gray-700"
            />

            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Smile size={20} />
            </button>
          </form>
        </div>

      </div>
      {
        <style jsx>{`
                    .no-scrollbar::-webkit-scrollbar{
                        display: none;
                    }
                    .no-scrollbar{
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
      }
    </>
  )
}

export default Chat
