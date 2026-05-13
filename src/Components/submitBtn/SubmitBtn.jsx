import React from 'react'
import { useFormStatus } from 'react-dom'

function SubmitBtn({ isFormValid,children }) {
    const {pending} = useFormStatus()
    return (
        <button
            className={`${isFormValid && !pending ? 'bg-green-500 cursor-pointer hover:bg-green-700 ' : 'bg-green-300'} text-white font-bold w-full rounded-md py-3`}
            disabled={!isFormValid || pending}
        >
            {pending ? 'درحال لود کردن': children}
        </button>
    )
}

export default SubmitBtn