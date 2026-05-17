'use client'
import { Star, StarHalf } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function Rating({ initalRate = 5, userId, ostadId }) {
    const [rating, setRating] = useState(initalRate)
    const handleClick = async starValue => {
        if (userId) {
            const res = await fetch('/api/rate', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    ostadId,
                    rate: starValue
                })
            })
            const data = await res.json()
            if (data.msg) {

                toast.success(data.msg, { position: 'bottom-center' })
                setRating(starValue)
            } else {
                toast.error(data.error, { position: 'bottom-center' })
            }
        } else {
            toast.error('برای ثبت رای وارد حساب کاربری شوید', { position: 'bottom-center' })
        }
    }

    const renderStar = (position) => {
        const starValue = position + 1

        if (rating >= starValue) {
            return <Star fill='yellow' color className='cursor-pointer' />
        }
        if (rating >= starValue - 0.5) {
            return <StarHalf fill='yellow' color className='cursor-pointer' />
        }
        return <Star fill='white' color className='cursor-pointer' />
    }
    return (
        <div className='flex flex-row-reverse'>
            {[...Array(5)].map((_, index) => (
                <div key={index} onClick={() => { handleClick(index + 1) }}>
                    {renderStar(index)}
                </div>
            ))}</div>
    )
}

export default Rating