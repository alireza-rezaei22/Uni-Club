"use client"
import { UserRound } from 'lucide-react'
import React, { useState, useActionState, useEffect } from 'react'
import SubmitBtn from '@/Components/submitBtn/SubmitBtn'
import editUserAction from '@/app/actions/editUserAction'
import { editUserSchema } from '@/utils/validation'
import { useAuthStore } from '@/store/useAuthStore'
import ChangePassword from '@/Components/changePassword/changePassword'
import toast from 'react-hot-toast'

function page() {
    const user = useAuthStore(state => state.user)
    const setUser = useAuthStore(state => state.setUser)
    const [isEditMode, setIsEditMode] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [editState, editFormInfo] = useActionState(editUserAction, {
        message: '',
        error: undefined,
        inputs: {
            userName: '',
            phone: '',
        }
    })

    useEffect(() => {
        console.log(user);
    }, [user])
    useEffect(() => {
        setIsFormValid(editUserSchema.safeParse({ phone, name }).success)
    }, [phone, name])

    useEffect(() => {
        if (editState.statusCode === 301) {
            toast.success(editState.message, { position: 'bottom-center' })
            setUser(editState.inputs)
            setIsEditMode(false)
        } else if (editState.statusCode !== 301 && editState.statusCode) {
            toast.error(editState.message, { position: 'bottom-center' })
        }
    }, [editState])

    return (
        <div className='flex flex-col justify-center items-center gap-10'>
            <h2 className="bg-blue-100 w-fit px-4 py-2 rounded-4xl text-[#0056AA] text-2xl font-bold mb-6 self-start">اطلاعات من</h2>
            <div className='bg-zinc-300 size-40 rounded-full flex justify-center items-center'>
                <UserRound className='size-24 text-zinc-800' />
            </div>
            <form
                className='w-full max-w-126 flex flex-col items-center gap-5'
                action={editFormInfo}
            >
                <input type='hidden' name='userId' value={user?.id} />
                <input type="text"
                    defaultValue={user?.name}
                    placeholder='نام کاربری ...'
                    onChange={e => setName(e.target.value)}
                    disabled={!isEditMode}
                    name='name'
                    className='bg-zinc-100 border w-full border-zinc-200 rounded-md px-2 py-3 outline-0'
                />
                <input type="text"
                    defaultValue={user?.phone}
                    placeholder='تلفن ...'
                    onChange={e => setPhone(e.target.value)}
                    disabled={!isEditMode}
                    name='phone'
                    className='bg-zinc-100 border w-full border-zinc-200 rounded-md px-2 py-3 outline-0'
                />
                {isEditMode ?
                    <div className='w-full flex gap-2'>
                        <button
                            className='bg-red-600 text-white w-1/2 rounded-md py-3 cursor-pointer hover:bg-red-700'
                            onClick={() => setIsEditMode(false)}                        >
                            لغو
                        </button>
                        <SubmitBtn isFormValid={isFormValid}>ثبت</SubmitBtn>
                    </div> :
                    <button
                        className='bg-green-400 text-zinc-700 font-bold w-full rounded-md py-3 cursor-pointer hover:bg-green-500 transition-colors'
                        onClick={() => setIsEditMode(true)}
                    >
                        ویرایش
                    </button>
                }
            </form>
            <ChangePassword />
        </div>
    )
}

export default page