'use client'
import React, { useEffect, useState } from 'react'
import ProductItem from '@/Components/productItem/ProductItem'
import { UseMarkStore } from '@/store/useMarkesStore'
import Loading from '@/Components/loading/Loading'
import PopUp from '@/Components/popUp/PopUp'
import { BookmarkX } from 'lucide-react'
import OstadItem from '@/Components/ostadItem/OstadItem'

function MarkedItems() {
  const userMarked = UseMarkStore(state => state.marks)
  const setUserMarked = UseMarkStore(state => state.setMarks)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMarked = async () => {

      if (!userMarked.length) {

        // const res = await fetch('/api/markItems')
        const res = await fetch(`/api/markItems`)
        if (res.ok) {
          const data = await res.json()
          console.log(data);
          console.log(data.markedItems);
          setUserMarked(data.markedItems)
          setLoading(false)
        } else {
          console.log('data is not ok');
        }
      } else {
        setLoading(false)
      }
    }
    getMarked()
  }, [userMarked.length, setUserMarked])

  return (
    <>
      <h2 className='text-indigo-400 text-2xl font-bold self-start mb-3'>نشان شده ها</h2>
      {
        loading ?
          <Loading /> :
          <>
            <div className='w-full flex flex-wrap'>
              {
                userMarked.length ?
                  userMarked.map(item => {
                    return <div key={item?._id} className='w-full lg:w-1/2 p-2 '>
                      {/* <div className='bg-white h-fit p-2 rounded-md border border-gray-300'> */}
                        {item.type == 'ostad' ?
                          <OstadItem key={item?._id} ostad={item} commentsCount={0} /> :
                          <ProductItem product={product} />
                        }
                      {/* </div> */}
                    </div>
                  }) :
                  <PopUp Icon={BookmarkX} msg={'هیچ محصولی را نشان نکرده اید'} />
              }
            </div>
          </>
      }
    </>
  )
}

export default MarkedItems