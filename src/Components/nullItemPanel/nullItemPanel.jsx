import React from 'react'

function NullItemPanel({ text }) {
    return (
        <div
            // className='text-zinc-400 bg-zinc-100 h-30 flex justify-center items-center'
            className='bg-zinc-300 h-36 flex justify-center items-center gap-5 p-2 rounded-md border border-zinc-300'
        >
            <h2 className=' text-zinc-400 text-lg font-semibold'>{text}</h2>
        </div >
    )
}

export default NullItemPanel