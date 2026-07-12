import { PenIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function DeleteBtn({ deleteHandler }) {
    return (
        <button
            className='bg-red-500 text-white flex gap-2 p-2 rounded-md cursor-pointer hover:bg-red-600 transition-colors'
            onClick={deleteHandler}
        >
            حذف
            <Trash2Icon />
        </button>
    )
}

export default DeleteBtn