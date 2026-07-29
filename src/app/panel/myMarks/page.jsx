'use client'
import React, { useEffect, useState } from 'react'
import ProductItem from '@/Components/productItem/ProductItem'
import { UseMarkStore } from '@/store/useMarkesStore'
import Loading from '@/Components/loading/Loading'
import PopUp from '@/Components/popUp/PopUp'
import { BookmarkX } from 'lucide-react'
import OstadItem from '@/Components/ostadItem/OstadItem'

function MarkedItems() {
  const [userComments, setUserComments] = useState([])
  const userMarked = UseMarkStore(state => state.marks)
  const setUserMarked = UseMarkStore(state => state.setMarks)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ err: 'تاکنون چیزی را نشان نکرده اید', icon: BookmarkX })

  useEffect(() => {

    const getUserProducts = async () => {
      try {
        const res = await fetch(`/api/markItems`)
        const data = await res.json()
        switch (data.status) {
          case 200: {
            if(data.markedItems.length){
              setUserMarked(data.markedItems)
              console.log(data.markedItems);
              
            }else{
              setError({ err: 'چیزی نشان نکرده اید', icon: BookmarkX })

            }
            break
          }
          case 403: {
            setError({ err: data.error, icon: BookmarkX })
            break
          }
          case 500: {
            setError({ err: data.error, icon: BookmarkX })
            break
          }
          default: {
            console.log('eheh');

            setError({ err: 'خطای ناشناخته از سمت سرور', icon: BookmarkX })
          }
        }
      } catch (error) {
        setError({ err: 'اشکالی پیش آمد', icon: BookmarkX })
        setLoading(false)
      }
      finally {
        setLoading(false)
      }
    }
    if (userMarked.length) {
      setUserMarked(userMarked)
      setError({ err: 'اشکالی پیش آمد', icon: BookmarkX })
      setLoading(false)

    } else {
      getUserProducts()
    }
    console.log(userMarked);
    
  }, [userMarked.length, setUserMarked])


  return (
    <>
      <h2 className="bg-blue-100 w-fit px-4 py-2 rounded-4xl text-[#0056AA] text-2xl font-bold mb-6 self-start">نشان شده ها</h2>
      {
        loading ?
          <Loading /> :
          <>
            <div className='w-full flex flex-wrap'>
              {
                userMarked.length ?
                  userMarked.map(item => {
                    return <div key={item?._id} className='w-full lg:w-1/2 p-2 '>
                      {item.type == 'ostad' ?
                        <OstadItem key={item?._id} ostad={item} commentsCount={0} /> :
                        <ProductItem product={item} />
                      }
                    </div>
                  }) :
                  <PopUp Icon={error.icon} msg={error.err} />
              }
            </div>
          </>
      }
    </>
  )
}

export default MarkedItems