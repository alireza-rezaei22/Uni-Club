'use client'
import { Star, StarHalf } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function Rating({ initalRate = 5 }) {
    const [rating, setRating] = useState(initalRate)
    const rate= [true, true, true, true, true]
    const handleClick = starValue => {
        console.log('click on star');
        
        setRating(starValue)
        toast.success('رای شما با موفقیت ثبت شد', {position: 'bottom-center'})
        // onRatingChange(starValue)
    }

    // const onRatingChange = (starValue)=>{
    //     setRating(starValue)
    // }
    const renderStar = (position) => {
        const starValue = position + 1
        
        if (rating >= starValue) {
            console.log('full');
            return <Star fill='yellow' color className='cursor-pointer' />
        }
        if (rating >= starValue - 0.5) {
            console.log('half');
            return <StarHalf fill='yellow' color className='cursor-pointer' />
        }
        // console.log('empty');
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