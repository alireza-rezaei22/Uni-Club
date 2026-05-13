"use client"
import forgetPassAction from '@/app/actions/forgetPassAction'
import { MessageSquareMore, Smartphone, RotateCcwKey } from 'lucide-react'
import React, { useActionState, useEffect, useState } from 'react'
import SubmitBtn from '../submitBtn/SubmitBtn'
import { forgetPassSchema } from '@/utils/validation'
import Password from '../Password/Password'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const UserPhone = (props) => {
    const { phone, setPhone } = props
    return (
        <>
            <Smartphone className='w-28 h-28' />
            <input type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                name='phone'
                className='bg-zinc-100 border w-full border-zinc-200 rounded-md p-3 outline-0'
                placeholder='شماره تلفن ...'
            />
            <SubmitBtn isFormValid={phone?.length == 11}>ادامه</SubmitBtn></>
    )
}
const UserOTP = (props) => {
    const { userCode, setUserCode } = props
    return (
        <>
            <MessageSquareMore className='w-28 h-28' />
            <input type="number"
                onChange={e => setUserCode(e.target.value)}
                name='userCode'
                className='bg-zinc-100 border w-full border-zinc-200 rounded-md p-3 outline-0'
                placeholder='لطفا کد پیامک شده را وارد کنید ...'
            />
            <SubmitBtn isFormValid={userCode.length == 6}>ادامه</SubmitBtn>
        </>
    )
}
const ChangePass = (props) => {
    const { phone, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword, isFormValid } = props
    return (
        <>
            <RotateCcwKey className='w-28 h-28' />
            <input type="hidden" name='phone' value={phone} />
            <Password
                placeholder={'گذرواژه'}
                state={newPassword}
                setState={setNewPassword}
                name='newPassword'
            />
            <Password
                placeholder={'تکرار گذرواژه'}
                state={confirmNewPassword}
                setState={setConfirmNewPassword}
                name='confirmNewPassword'
            />
            <SubmitBtn isFormValid={isFormValid}>ادامه</SubmitBtn>
        </>
    )
}

function ForgetPass({setFormStatus}) {
    const router = useRouter()
    const [phone, setPhone] = useState('')
    const [userCode, setUserCode] = useState(0)
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [isFormValid, setIsFormValid] = useState(null)
    const components = [
        { component: UserPhone, mode: 'phoneInput' },
        { component: UserOTP, mode: 'otpInput' },
        { component: ChangePass, mode: 'changePass' },
    ]
    const [forgetState, forgetPassFormAction] = useActionState(forgetPassAction, {
        message: "",
        error: undefined,
        OTPCode: null,
        statusCode: null,
        inputs: {
            actionMode: 'phoneInput',
            phone: '',
            otpCode: null,
        }
    })

    const ActiveComponent = components.find(
        comp => comp.mode === forgetState.inputs.actionMode
    )?.component;

    useEffect(() => {
        setIsFormValid(forgetPassSchema.safeParse({ newPassword, confirmNewPassword }).success)
    }, [newPassword, confirmNewPassword])

    useEffect(() => {
        if (forgetState.inputs.actionMode === 'otpInput' && forgetState.OTPCode && forgetState.statusCode !== 400) {
            window.alert(`کد احراز هویت: ${forgetState.OTPCode}`)
        }
        if (forgetState.statusCode === 301) {
            router.push('/panel')
            toast.success(forgetState.message, { position:'bottom-center'})
            setFormStatus('login')
        }else if(forgetState.statusCode === 200){
            toast.success(forgetState.message, { position:'bottom-center'})
        }
        else if(![301, 200].includes(forgetState.statusCode) && forgetState.statusCode){
            toast.error(forgetState.message, { position:'bottom-center'})
        }
    }, [forgetState])

    return (
        <form
            className='w-full flex flex-col justify-center items-center gap-3 px-10'
            action={forgetPassFormAction}
        >
            <input type="hidden" value={forgetState.inputs.actionMode} name='actionMode' />
            {<ActiveComponent
                phone={phone} setPhone={setPhone}
                userCode={userCode} setUserCode={setUserCode}
                newPassword={newPassword} setNewPassword={setNewPassword}
                confirmNewPassword={confirmNewPassword} setConfirmNewPassword={setConfirmNewPassword}
                isFormValid={isFormValid}
            />}
        </form>
    )
}

export default ForgetPass