'use client'
import { Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function ItemDate({ date }) {    
    const [itemDateState, setItemDateState] = useState(null)
    const time = new Date(date).toLocaleTimeString().slice(0, 5)
    function getPersianDateString(date) {
        return new Date(date).toLocaleDateString('fa-IR', {
            timeZone: 'Asia/Tehran',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    }
    useEffect(() => {
        const localDate = getPersianDateString(date)
        const nowDate = getPersianDateString(new Date())
        const yesterdayDate = new Date()
        yesterdayDate.setDate(yesterdayDate.getDate() - 1)
        const yesterdayDateStr = getPersianDateString(yesterdayDate)
        if (localDate === nowDate) {
            setItemDateState('امروز')
        } else if (localDate === yesterdayDateStr) {
            setItemDateState('دیروز')
        } else {
            setItemDateState(localDate)

        }
    })

    return (
        <div className='flex items-center text-zinc-500 gap-1 text-xs md:text-sm font-medium'>
            {/* <Clock size={14} /> */}
            <h5>{time}</h5>
            <h5>{itemDateState}</h5>
        </div>
    )
}

export default ItemDate