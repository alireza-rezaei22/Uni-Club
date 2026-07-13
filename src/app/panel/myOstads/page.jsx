"use client"
import React, { Suspense, useEffect, useState } from 'react'
import Loading from '@/Components/loading/Loading'
import PopUp from '@/Components/popUp/PopUp'
import { MessageSquareOffIcon } from 'lucide-react'
import MyOstad from '@/Components/myOstad/MyOstad'
import { useUOstadsStore } from '@/store/useUOstadsStore'

function MyOstads() {
    const ostads = useUOstadsStore(state => state.ostads)
    const setOstads = useUOstadsStore(state => state.setOstads)
    const [loading, setLoading] = useState(!ostads.length)
    const [error, setError] = useState({ err: '', icon: null })

    useEffect(() => {
        console.log(ostads);

        const getMyOstads = async () => {
            try {
                const res = await fetch(`/api/ostads/my`)
                const data = await res.json()
                switch (data.status) {
                    case 200: {
                        setOstads(data.items)
                        break
                    }
                    case 403: {
                        setError({ err: data.error, icon: MessageSquareOffIcon })
                        break
                    }
                    case 500: {
                        setError({ err: data.error, icon: MessageSquareOffIcon })
                        break
                    }
                    default: {
                        setError({ err: 'خطای ناشناخته از سمت سرور', icon: MessageSquareOffIcon })
                    }
                }
            } catch (error) {
                setError({ err: 'اشکالی پیش آمد', icon: MessageSquareOffIcon })
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
        if (ostads.length) {
            setLoading(false)
        } else {
            getMyOstads()
        }

    }, [ostads, setOstads])
    return (
        <>
            <h2 className="bg-blue-100 w-fit px-4 py-2 rounded-4xl text-[#0056AA] text-2xl font-bold mb-6 self-start">استادهایی که ثبت کرده ام</h2>
            <div className='w-full flex flex-wrap'>
                <>
                    {
                        loading ?
                            <Loading /> :
                            ostads.length ?
                                ostads.map(item => {
                                    return <div key={item._id} className='w-full lg:w-1/2 p-2 '>
                                        <MyOstad {...item} />
                                    </div>
                                }) :
                                <PopUp Icon={error.icon} msg={error.err} />
                    }
                </>
            </div>
        </>
    )
}
export default MyOstads