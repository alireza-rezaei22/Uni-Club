"use client"
import { UseMarkStore } from '@/store/useMarkesStore';
import { BookmarkCheck, BookmarkPlus } from 'lucide-react'
import React, { useCallback, useEffect, useState, useTransition } from 'react'
import toast from 'react-hot-toast';

function MarkIcon({ itemId, type }) {
  const [isPending, startTransition] = useTransition()
  const [isMarked, setIsMarked] = useState(false)
  const userMarkeds = UseMarkStore(state => state.marks)
  const setUserMarkeds = UseMarkStore(state => state.setMarks)

  const addToMarked = useCallback(async (event) => {
    setIsMarked(!isMarked)
    startTransition(async () => {
      if (isMarked) {
        try {
          const res = await fetch('/api/markItems', {
            method: 'DELETE',
            header: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              itemId
            })
          })
          const data = await res.json()
          switch (data.status) {
            case (200): {
              setUserMarkeds(data.markedItems)
              break
            }
            case (400): {
              toast.error(data.error, { position: 'bottom-center' })
              break
            }
            case (403): {
              toast.error(data.error, { position: 'bottom-center' })
              break
            }
            case (500): {
              toast.error(data.error, { position: 'bottom-center' })
              break
            }
            default: {
              console.log(data);
            }
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
          const data = await res.json()

          switch (data.status) {
            case (201): {
              setUserMarkeds(data.markedItems)
              break
            }
            case (400): {
              toast.error(data.error, { position: 'bottom-center' })
              break
            }
            case (403): {
              toast.error(data.error, { position: 'bottom-center' })
              break
            }
            case (500): {
              toast.error(data.error, { position: 'bottom-center' })
              break
            }
            default: {
              console.log(data);
            }
          }
        } catch (error) {
          console.log(error);
          toast.error('خطا در اتصال به سرور', { position: 'bottom-center' })
        }
      }
    })

  }
  )
  useEffect(() => {
    setIsMarked(userMarkeds.some(marked => marked?._id == itemId));
  }, [userMarkeds])

  return (
    <button
      className={`p-1 rounded-full hover:bg-zinc-300/30 cursor-pointer transition-all ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
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