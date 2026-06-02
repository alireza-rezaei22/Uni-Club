"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductItem from '@/Components/productItem/ProductItem'
import toast from 'react-hot-toast'
import { SearchX } from 'lucide-react'
import PopUp from '@/Components/popUp/PopUp'
import OstadItem from '@/Components/ostadItem/OstadItem'
import Loading from '@/Components/loading/Loading'

function SearchResult() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const res = await fetch(`/api/searchItem/${query}`)
        const data = await res.json()

        const result = data.searchResult
        console.log(result);
        setSearchResults(result);
      } catch (error) {
        toast.error('لطفا دوباره تلاش کنید', { position: 'bottom-center' })
      }
    }
    getSearchResult()
  }, [query])

  return (
    <>
      <div className={`flex ${searchResults.length ? 'items-start' : ' bg-zinc-900 items-center'} justify-center h-[100dvh]`}>
        <Suspense fallback={<Loading />}>
          {
            searchResults.length ?
              <div className='w-full max-w-7xl flex flex-wrap '>
                {searchResults.map(item => {
                  return <div key={item?._id} className='w-full lg:w-1/2 p-2 '>
                    {/* <div className='bg-white h-fit p-2 rounded-md border border-gray-300'> */}
                    {item.biography ?
                      <OstadItem key={item?._id} ostad={item} commentsCount={0} /> :
                      <ProductItem product={product} />
                    }
                    {/* </div> */}
                  </div>
                })}
              </div> :
              <PopUp Icon={SearchX} msg={'هیچ مورد مشابهی پیدا نشد'} />
          }
        </Suspense>
      </div>
    </>
  )
}

export default SearchResult