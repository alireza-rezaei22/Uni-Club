"use client"
import { LogIn } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useActionState } from 'react'
import loginAction from '@/app/actions/login'
import SubmitBtn from '@/Components/submitBtn/SubmitBtn'
import { loginSchema } from '@/utils/validation'
import ForgetPass from '@/Components/forgetPass/ForgetPass'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Password from '@/Components/Password/Password'


function Login({ setFormStatus }) {
    const router = useRouter()
    const [isFormValid, setIsFormValid] = useState(false)
    const [isForgetPassMode, setIsForgetPassMode] = useState(false)
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [loginState, loginFormAction] = useActionState(loginAction, {
        message: "",
        error: undefined,
        statusCode: null,
        inputs: {
            phone: '',
            password: '',
        }
    })
    useEffect(() => {
        setIsFormValid(loginSchema.safeParse({ phone, password }).success)
    }, [phone, password])

    useEffect(() => {
        console.log(loginState);
        if (loginState.statusCode === 301) {
            toast.success(loginState.message, { position: 'bottom-center' })
            router.push('/')
        } else if (loginState.statusCode !== 301 && loginState.statusCode) {
            toast.error(loginState.message, { position: 'bottom-center' })
        }
    }, [loginState])

    return (
        <div className='bg-gradient-to-br from-indigo-500 to-indigo-600 text-zinc-900 relative w-full max-w-96 border rounded-md py-8'>
            {isForgetPassMode ?
                <ForgetPass setFormStatus={setFormStatus} />
                :
                <form
                    className='w-full flex flex-col justify-center items-center gap-3 px-5'
                    action={loginFormAction}
                >
                    <LogIn className='w-28 h-28 text-white' />
                    <input type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        name='phone'
                        className='bg-zinc-100 border w-full border-indigo-700 rounded-md px-2 py-3 outline-0'
                        placeholder='شماره تلفن ...'
                    />
                    <Password
                        placeholder={'گذرواژه'}
                        state={password}
                        setState={setPassword}
                        name='password'
                    />

                    <SubmitBtn isFormValid={isFormValid}>ورود</SubmitBtn>
                </form>
            }
            <div className='absolute -bottom-12 w-full flex flex-row justify-between text-indigo-400'>
                <h4
                    className='cursor-pointer px-4 py-2 rounded-full hover:bg-indigo-200 hover:text-zinc-900 transition-colors'
                    onClick={() => setFormStatus('signin')}
                >
                    ثبت نام
                </h4>
                <h4
                    className='cursor-pointer px-4 py-2 rounded-full hover:bg-indigo-200 hover:text-zinc-900 transition-colors'
                    onClick={() => setIsForgetPassMode(prev => !prev)}
                >
                    {isForgetPassMode ? 'ورود' : 'فراموشی رمز'}
                </h4>
            </div>
        </div>
    )
}

export default Login