"use client"
import Loading from '@/Components/loading/Loading'
import MyComment from '@/Components/myComment/MyComment'
import PopUp from '@/Components/popUp/PopUp'
import { useUserCommentsStore } from '@/store/useUserCommentsStore'
import { MessageSquareOffIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function page() {
    const userCommentsStore = useUserCommentsStore(state => state.comments)
    const setuserCommentsStore = useUserCommentsStore(state => state.setComments)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({ err: 'تاکنون دیدگاهی ثبت نکرده اید', icon: MessageSquareOffIcon })

    useEffect(() => {

        const getUserProducts = async () => {
            try {
                const res = await fetch(`/api/comments`)
                const data = await res.json()
                console.log(data.userCommentsWithC_Count);
                switch (data.status) {
                    case 200: {
                        setuserCommentsStore(data.userCommentsWithC_Count)
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
        if (userCommentsStore.length) {
            setLoading(false)
        } else {
            getUserProducts()
        }
    }, [userCommentsStore])
    return (
        <>
            <h2 className="bg-blue-100 w-fit px-4 py-2 rounded-4xl text-[#0056AA] text-2xl font-bold mb-6 self-start">دیدگاه های من</h2>
            <div className='w-full flex flex-wrap'>
                {
                    loading ?
                        <Loading />
                        :
                        userCommentsStore.length ?
                            userCommentsStore.map(item => {
                                return <div key={item._id} className='w-full lg:w-1/2 p-2 '>
                                    <MyComment {...item} />
                                </div>
                            }) :
                            <PopUp Icon={error.icon} msg={error.err} />
                }
            </div>
        </>
    )
}

export default page