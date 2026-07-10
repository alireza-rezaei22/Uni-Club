'use client'
import { Mic, SendHorizontal, Smile, MessageSquare, Check } from "lucide-react"
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useAuthStore } from "@/store/useAuthStore"
import { useParams } from "next/navigation"
import PopUp from "@/Components/popUp/PopUp"
import Image from "next/image"

function Chat() {
  const params = useParams();
  const socketRef = useRef(null);
  const id = params.id;
  const messagesEndRef = useRef(null);

  const [product, setProduct] = useState('')
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [chatId, setchatId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const user = useAuthStore(state => state.user)

  useEffect(() => {
    if (!id) return;
    if (!socketRef.current) {
      socketRef.current = io(process.env.NEXT_PUBLIC_SITE_URL, {
        query: { id }
      });
    }
    const socket = socketRef.current
    socket.on('init-data', (data) => {
      setchatId(data.chatId)
      console.log('data.messages: ', data.messages);
      
      setMessages(data.messages);
      setProduct(data.product);
      setParticipants(data.participants || []);
    });
    socket.on('new-message', (newMessage) => {

      setMessages(prev => [...prev, newMessage]);
    });
    return () => {
      socket?.off('init-data');
      socket?.off('new-message');
    };
  }, [id])
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socketRef.current) {
      const newMsg = {
        chatId,
        newMessage
      }
      socketRef.current.emit('send-message', newMsg);
      setNewMessage('');
    }
  };
  return (
    <>
      <div className=" bg-white w-full p-5 rounded-xl flex justify-between">
        <div className='flex-1 flex flex-col'>
          <h3 className='font-bold text-lg'>{product?.ownerId?.name}</h3>
          <div className='m-2'>
            <h4 className='font-semibold text-gray-700'>{product?.title}</h4>
            <p className='text-gray-500'>{product?.price ? product?.price.toLocaleString() + ' تومان' : 'توافقی'}</p>
          </div>
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
            <PopUp Icon={MessageSquare} msg={'پیام ارسال کنید ...'} />
            :
            messages.map(msg => {
              return <div key={msg.id} className={`${msg.senderId === user?.id ? 'bg-green-400 self-start rounded-br-sm' : 'bg-yellow-300 self-end rounded-bl-sm'} w-fit max-w-3/4 p-2 rounded-2xl`}>
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
        <form
          onSubmit={handleSend}
          className='bg-white w-full max-w-6xl h-16 flex items-center gap-3 p-3 border border-gray-200 rounded-2xl shadow-sm mb-10 md:mb-0'
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
            value={chatId}
            name="chatId"
          />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            name="newMessage"
            placeholder="پیام خود را بنویسید..."
            className="flex-1 px-2 py-2 outline-none text-gray-700"
          />

          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Smile size={20} />
          </button>
        </form>

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
