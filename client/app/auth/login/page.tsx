'use client'
import CommonForm from '@/components/core/common-form/CommonForm'
import { loginFromControls } from '@/config'
import Link from 'next/link'
import React, { useState } from 'react'

const initialState = {
  email: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState(initialState);

  const onSubmit = () => { }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your account</h1>
        <p className='mt-2'>
          Don&apos;t have an account
          <Link
            className='font-medium text-primary hover:underline ml-2'
            href='/auth/register'
          >
            Sign Up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFromControls}
        buttonText='Login'
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Login