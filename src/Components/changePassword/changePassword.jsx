"use client"
import React, { useActionState, useEffect, useState } from 'react'
import Password from '@/Components/Password/Password'
import SubmitBtn from '@/Components/submitBtn/SubmitBtn'
import ChangePassAction from '@/app/actions/changePassAction'
import { changePassSchema } from '@/utils/validation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { KeyRound } from 'lucide-react'

function ChangePassword() {
    const router = useRouter()
    const [isChangePassMode, setIsChangePassMode] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [changePassState, changePassFormAcion] = useActionState(ChangePassAction, {
        message: null,
        error: null,
        statusCode: null,
        inputs: {
            currentPassword: null,
            newPassword: null,
        }
    })
    useEffect(() => {
        setIsFormValid(changePassSchema.safeParse({ currentPassword, newPassword, confirmNewPassword }).success)
    }, [currentPassword, newPassword, confirmNewPassword])
    useEffect(() => {
        if (changePassState.statusCode === 301) {
            toast.success(changePassState.message, { position: 'bottom-center' })
            router.push('/panel/userInfo')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
            setIsChangePassMode(false)
        } else if (changePassState.statusCode !== 301 && changePassState.statusCode) {
            toast.error(changePassState.message, { position: 'bottom-center' })
        }
    }, [changePassState])
    return (
        <>
            <button
                className={`self-start ${isChangePassMode ? 'bg-blue-400 text-zinc-700' : 'bg-zinc-600 text-blue-400 border-3 border-blue-400'} w-fit rounded-lg py-3 px-2 cursor-pointer hover:bg-blue-300 hover:border-0 hover:text-blue-600 transition-colors`}
                onClick={() => setIsChangePassMode(prev => !prev)}
            >تغییر گذرواژه</button>
            {isChangePassMode &&
                <>
                    <h2 className='text-blue-500 text-2xl font-bold self-start'>تغییر گذرواژه</h2>
                    <div className='bg-zinc-300 size-40 rounded-full flex justify-center items-center'>
                        <KeyRound className='size-24 text-zinc-800' />
                    </div>
                    <form
                        className='w-full max-w-126 flex flex-col items-center gap-5 mb-16'
                        action={changePassFormAcion}
                    >
                        <Password
                            placeholder={'گذرواژه کنونی'}
                            state={currentPassword}
                            setState={setCurrentPassword}
                            name='currentPassword'
                        />
                        <Password
                            placeholder={'گذرواژه جدید'}
                            state={newPassword}
                            setState={setNewPassword}
                            name='newPassword'
                        />
                        <Password
                            placeholder={'تکرار گذرواژه جدید'}
                            state={confirmNewPassword}
                            setState={setConfirmNewPassword}
                            name='confirmNewPassword'
                        />
                        <SubmitBtn isFormValid={isFormValid}>ثبت</SubmitBtn>
                    </form>
                </>
            }
        </>
    )
}

export default ChangePassword