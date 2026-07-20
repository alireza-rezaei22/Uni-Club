'use client'
import { Star, StarHalf } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import toast from 'react-hot-toast'

function Rating({ initalRate = 5, userId, ostadId }) {
    const [isPending, startTransition] = useTransition()

    const [rating, setRating] = useState(initalRate)
    const handleClick = starValue => {
        if (!userId) {
            toast.error('برای ثبت رای وارد حساب کاربری شوید', { position: 'bottom-center' })
            return
        }
        setRating(starValue)
        startTransition(async () => {
            const res = await fetch('/api/rate', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, ostadId, rate: starValue })
            })
            const data = await res.json()
            if (data.msg) {
                toast.success(data.msg, { position: 'bottom-center' })
            } else {
                toast.error(data.error, { position: 'bottom-center' })
                setRating(initalRate)
            }
        })
    }

    const renderStar = (position) => {
        const starValue = position + 1

        if (rating >= starValue) {
            return <Star fill='yellow' color={'yellow'} className='cursor-pointer' />
        }
        if (rating >= starValue - 0.5) {
            return <StarHalf fill='yellow' color={'yellow'} className='cursor-pointer' />
        }
        return <Star fill='white' color={'gray'} className='cursor-pointer' />
    }
    return (
        <div className={`flex flex-row-reverserow-reverse ${isPending ? ' opacity-50 pointer-events-none' : ''}`}>
            {
                [...Array(5)].map((_, index) => (
                    <div key={index} onClick={() => { handleClick(index + 1) }}>
                        {renderStar(index)}
                    </div>
                ))
            }</ div>
    )
}

export default Rating