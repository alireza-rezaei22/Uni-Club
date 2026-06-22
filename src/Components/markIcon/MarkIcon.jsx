"use client"
import { UseMarkStore } from '@/store/useMarkesStore';
import { BookmarkCheck, BookmarkPlus } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function MarkIcon({ itemId, type }) {
  const [isMarked, setIsMarked] = useState(false)
  const userMarkeds = UseMarkStore(state => state.marks)
  const setUserMarkeds = UseMarkStore(state => state.setMarks)

  const addToMarked = useCallback(async (event) => {
    event.preventDefault()
    if (isMarked) {
      try {
        const res = await fetch('/api/markItems', {
          method: 'DELETE',
          header:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            itemId
          })
        })
        if (res.ok) {
          const data = await res.json()
          console.log(data.markedItems);
          
          setUserMarkeds(data.markedItems)
        } else {
          const response = await res.json()
          toast.error(response.error, { position: 'bottom-center' })
        }
      } catch {
        toast.error('خطا در اتصال به سرور', { position: 'bottom-center' })
      }
    } else {
      try {
        const res = await fetch('/api/markItems', {
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            itemId,
            type
          })
        })
        if (res.ok) {
          const data = await res.json()
          console.log(data);
          setUserMarkeds(data.markedItems)
        } else {
          const response = await res.json()
          toast.error(response.error, { position: 'bottom-center' })
        }
      } catch (error) {
        console.log(error);
        toast.error('خطا در اتصال به سرور', { position: 'bottom-center' })
      }
    }
  }
  )
  useEffect(() => {
    setIsMarked(userMarkeds.some(marked => marked?._id === itemId));
  }, [userMarkeds])

  return (
    <button
      className='p-1 rounded-full hover:bg-zinc-300/30 cursor-pointer transition-all'
      onClick={(e) => {
        addToMarked(e)
      }}
    >   {
        isMarked ?
          <BookmarkCheck
            className={`text-green-600`}
          />
          :
          <BookmarkPlus
            className={`text-zinc-700`}
          />
      }
    </button>
  )
}

export default MarkIcon