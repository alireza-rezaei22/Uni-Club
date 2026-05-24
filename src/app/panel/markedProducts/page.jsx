'use client'
import React, { useEffect, useState } from 'react'
import ProductItem from '@/Components/productItem/ProductItem'
import { UseMarkStore } from '@/store/useMarkesStore'
import Loading from '@/Components/loading/Loading'
import PopUp from '@/Components/popUp/PopUp'
import { BookmarkX } from 'lucide-react'

function markedProducts() {
  const productsMarked = UseMarkStore(state => state.marks)
  const setProductsMarked = UseMarkStore(state => state.setMarks)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMarked = async () => {
      console.log(productsMarked);

      if (!productsMarked.length) {

        const res = await fetch(`/api/markProducts`)
        if (res.ok) {
          const data = await res.json()
          console.log(data.markedProductsItems);
          setProductsMarked(data.markedProductsItems)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    getMarked()
  }, [productsMarked.length, setProductsMarked])

  return (
    <>
      <h2 className='text-indigo-400 text-2xl font-bold self-start mb-3'>نشان شده ها</h2>
      {
        loading ?
          <Loading /> :
          <>
            <div className='w-full flex flex-wrap'>
              {
                productsMarked.length ?
                  productsMarked.map(product => {
                    return <div key={product?._id} className='w-full lg:w-1/2 p-2 '>
                      <div className='bg-white h-fit p-2 rounded-md border border-gray-300'>
                        <ProductItem product={product} />
                      </div>
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

export default markedProducts