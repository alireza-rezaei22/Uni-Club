import React from 'react'

function NullItemPanel({ text }) {
    return (
        <div
            className='bg-zinc-300 h-44 flex justify-center items-center gap-5 p-2 rounded-md border border-zinc-300'
        >
            <h2 className=' text-zinc-400 text-lg font-semibold'>{text}</h2>
        </div >
    )
}

export default NullItemPanel