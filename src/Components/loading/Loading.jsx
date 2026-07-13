import React from 'react'
import { LoaderPinwheel } from 'lucide-react';

function Loading() {
    return (
        <div className='w-full h-[85vh] opacity-50 flex flex-col justify-center items-center rounded-xl'>
            
            <span className='animate-pulse'>
                <LoaderPinwheel size={60} className='text-[#0056AA] animate-spin'/>
            </span>
        </div>
    )
}

export default Loading