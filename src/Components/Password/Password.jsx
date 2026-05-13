import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';

export default function Password({ placeholder, state, setState, name }) {
    const [isHide, setisHide] = useState(true)

    return (
        <div
            className='flex items-center justify-between bg-zinc-100 border w-full border-zinc-200 rounded-md px-2 py-1 outline-0'
        >
            <input
                type={isHide ? 'password' : 'text'}
                value={state}
                placeholder={placeholder}
                className='outline-0 w-full'
                name={name}
                onChange={(e) => setState(e.target.value)}
            />
            <span className='my-2'
                onClick={() => setisHide(prev => !prev)}>
                {isHide ?
                    <Eye color='gray' fontSize='small' /> :
                    <EyeOff color='gray' fontSize='small' />
                }
            </span>
        </div>
    )
}
