import { PenIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function DeleteBtn({ deleteHandler }) {
    return (
        <button
            className='bg-red-500 text-white flex items-center gap-2 p-1 rounded-md cursor-pointer hover:bg-red-600 transition-colors'
            onClick={deleteHandler}
        >
            حذف
            <Trash2Icon size={18} />
        </button>
    )
}

export default DeleteBtn