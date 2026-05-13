"use client"
import React, { useState } from 'react'
import Login from '@/Components/login/login';
import Register from '@/Components/register/register';
function LoginRegister() {
  const [formStatus, setFormStatus] = useState('login')
  
  return (
      <div className='w-full h-[92vh] p-10 flex justify-center items-center'>
        {formStatus === 'login' ?
        <>
          <Login setFormStatus={setFormStatus}/>
        </>
          :
          <Register setFormStatus={setFormStatus}/>
        }
      </div >
  )
}

export default LoginRegister