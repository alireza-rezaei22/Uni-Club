"use client"
import Password from '@/Components/Password/Password'
import SubmitBtn from '@/Components/submitBtn/SubmitBtn'
import registerAction from '@/app/actions/register'
import { registerSchema } from '@/utils/validation'
import { LogIn, UserPlus2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function Register({ setFormStatus }) {
    const router = useRouter()
    const [isFormValid, setIsFormValid] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerState, registerFormAction] = useActionState(registerAction, {
        message: "",
        error: undefined,
        statusCode: null,
        inputs: {
            name: '',
            phone: '',
            password: '',
            confirmPassword: '',
        }
    })
    useEffect(() => {
        setIsFormValid(registerSchema.safeParse({ name, phone, password, confirmPassword }).success)
    }, [name, phone, password, confirmPassword])
    useEffect(() => {
        if (registerState.statusCode === 201) {
            toast.success(registerState.message, { position: 'bottom-center' })
            setFormStatus('login')
        } else if (registerState.statusCode !== 201 && registerState.statusCode) {
            toast.error(registerState.message, { position: 'bottom-center' })
        }
    }, [registerState])
    return (
        <form
            className='bg-gradient-to-br from-indigo-500 to-indigo-600 text-zinc-900 relative w-full max-w-96 flex flex-col justify-center items-center gap-3 border rounded-md py-8 px-5'
            action={registerFormAction}
        >
            {/* <LogIn className='w-28 h-28 text-white' /> */}
            <UserPlus2Icon className='w-28 h-28 text-white' />
            <input
                type="text"
                name='name'
                value={name}
                onChange={e => { setName(e.target.value) }}
                className='bg-zinc-100 border w-full border-zinc-200 rounded-md p-3 outline-0'
                placeholder='نام...'
            />
            <input
                type="text"
                name='phone'
                value={phone}
                onChange={e => { setPhone(e.target.value) }}
                className='bg-zinc-100 border w-full border-zinc-200 rounded-md p-3 outline-0'
                placeholder='شماره تلفن...'
            />
            <Password
                placeholder={'گذرواژه'}
                state={password}
                setState={setPassword}
                name='password'
            />
            <Password
                placeholder={'تکرار گذرواژه'}
                state={confirmPassword}
                setState={setConfirmPassword}
                name='confirmPassword'
            />
            <SubmitBtn isFormValid={isFormValid}>ثبت نام</SubmitBtn>

            <h4
                className=' px-4 py-2 rounded-full hover:bg-indigo-200 hover:text-zinc-900 transition-colors  absolute -bottom-12 self-start text-indigo-400 cursor-pointer'
                onClick={() => setFormStatus('login')}
            >
                ورود
            </h4>
        </form>
    )
}

export default Register