"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductItem from '@/Components/productItem/ProductItem'
import toast from 'react-hot-toast'
import { SearchX } from 'lucide-react'
import PopUp from '@/Components/popUp/PopUp'

function SearchResult() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    const getSearchResult = async () => {
      try {

        const res = await fetch(`/api/searchProduct/${query}`)
        const data = await res.json()
        const result = data.searchResult

        setSearchResults(result);
      } catch (error) {
        toast.error('لطفا دوباره تلاش کنید', { position: 'bottom-center' })
      }
    }
    getSearchResult()
  }, [])
  return (
    <>
      <div className={`flex ${searchResults.length ? 'items-start' : ' bg-zinc-900 items-center'} justify-center h-[100dvh]`}>
        {
          searchResults.length ?
            <div className='w-full max-w-7xl flex flex-wrap '>
              {searchResults.map(product => {
                return <div key={product?._id} className='w-full lg:w-1/2 p-2 '>
                  <div className='bg-white h-fit p-2 rounded-md border border-gray-300'>
                    <ProductItem product={product} />
                  </div>
                </div>
              })}
            </div> :
            <PopUp Icon={SearchX} msg={'هیچ محصول مشابهی یافت نشد'} />
        }
      </div>
    </>
  )
}

export default SearchResult