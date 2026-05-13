"use client"
import { UseMarkStore } from '@/store/useMarkesStore';
import { BookmarkCheck, BookmarkPlus } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function MarkIcon({ productId }) {
  const [isMarked, setIsMarked] = useState(false)
  const productsMarked = UseMarkStore(state => state.marks)
  const setProductsMarked = UseMarkStore(state => state.setMarks)

  const addToMarked = useCallback(async (event) => {
    event.preventDefault()
    if (isMarked) {
      try {
        const res = await fetch(`/api/markProducts/${productId}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          const data = await res.json()
          setProductsMarked(data.markedProductsItems)
        } else {
          const response = await res.json()
          toast.error(response.error, { position: 'bottom-center' })
        }
      } catch {
        toast.error('خطا در اتصال به سرور', { position: 'bottom-center' })
      }
    } else {
      try {
        const res = await fetch(`/api/markProducts/${productId}`, {
          method: 'POST',
        })
        if (res.ok) {
          const data = await res.json()
          console.log(data.markedProductsItems);
          setProductsMarked(data.markedProductsItems)
        } else {
          console.log('error');
          const response = await res.json()
          toast.error(response.error, { position: 'bottom-center' })
        }
      } catch {
        toast.error('خطا در اتصال به سرور', { position: 'bottom-center' })
      }
    }
  }
  )
  useEffect(() => {
    setIsMarked(productsMarked.some(marked => marked?._id === productId));
  }, [productsMarked])

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