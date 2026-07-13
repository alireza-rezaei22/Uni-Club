"use client"
import React, { useEffect, useState } from 'react'
import { useOstadsStore } from '@/store/useOstadsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { UseMarkStore } from '@/store/useMarkesStore';
import Loading from '../loading/Loading';
import { SearchX } from 'lucide-react';
import PopUp from '../popUp/PopUp';
import OstadItem from '../ostadItem/OstadItem';

export default function OstadsList({ ostadsArray }) {
    const ostads = useOstadsStore(state => state.ostads)
    const setOstads = useOstadsStore(state => state.setOstads)
    const userData = useAuthStore(state => state.user)
    const [loading, setLoading] = useState(true)
    const UserMarkeds = UseMarkStore(state => state.marks)
    const setUserMarkeds = UseMarkStore(state => state.setMarks)
    useEffect(() => {
        const getOstads = async () => {
            setOstads(ostadsArray)
            setLoading(false)
        }
        getOstads()
    }, [])
    useEffect(() => {
        if (userData) {
            const getMarked = async () => {
                const res = await fetch(`/api/markItems`)
                const data = await res.json()
                setUserMarkeds(data.markedItems)
            }
            getMarked()
        }
    }, [ostads, userData])

    return (
        <div className='flex-1 flex justify-center w-full'>
            {
                loading ?
                    <Loading />
                    :
                    <div className='flex flex-wrap items-start w-full h-full'>

                        {ostads?.length ?
                            ostads.map(ostad => {
                                return <div key={ostad._id} className='w-full md:w-1/2 p-2'>
                                    <OstadItem key={ostad._id} ostad={ostad} commentsCount={ostad.commentsCount} />
                                </div>
                            }) :
                            <PopUp Icon={SearchX} msg={'هیچ استادی یافت نشد'} />
                        }
                    </div>
            }
        </div>


    )
}
