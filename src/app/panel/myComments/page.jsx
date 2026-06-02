"use client"
import Loading from '@/Components/loading/Loading'
import MyComment from '@/Components/myComment/MyComment'
import PopUp from '@/Components/popUp/PopUp'
import { useUserCommentsStore } from '@/store/useUserCommentsStore'
import { MessageSquareOffIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function page() {
    const [userComments, setUserComments] = useState([])
    const userCommentsStore = useUserCommentsStore(state => state.comments)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getUserProducts = async () => {
            try {
                const res = await fetch(`/api/comments`)
                const comments = await res.json()
                console.log(comments);

                setUserComments(comments)
                setLoading(false)
            } catch {
                setLoading(false)
            }
        }
        if (userCommentsStore.length) {
            setUserComments(userCommentsStore)
        } else {
            getUserProducts()
        }
    }, [userCommentsStore])
    return (
        <>
            <h2 className='text-indigo-400 text-2xl font-bold self-start mb-3'>دیدگاه های من</h2>
            <div className='w-full flex flex-wrap'>
                {
                    loading ?
                        <Loading />
                        :
                        userComments.length ?
                            userComments.map(item => {
                                return <div key={item._id} className='w-full lg:w-1/2 p-2 '>
                                    <MyComment {...item} />
                                </div>
                            }) :
                            <PopUp Icon={MessageSquareOffIcon} msg={'هنوز هیچ دیدگاهی ثبت نکرده اید'} />
                }
            </div>
        </>
    )
}

export default page