'use client'
import { useLogin } from '@/app/auth/auth.query'
import { loginFromControls } from '@/config'
import { getFromStorage } from '@/utility/storage'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useState } from 'react'

const CommonForm = dynamic(() => import('@/components/core/common-form/CommonForm'), { ssr: false })

type LoginFormData = {
  email: string;
  password: string;
}

const initialState: LoginFormData = {
  email: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>(initialState);
  const { mutate, error, isPending } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ ...formData });
  };
  console.log(!!getFromStorage('token','local'));

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your account</h1>
        <p className='mt-2'>
          Don&apos;t have an account?
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
        buttonText={isPending ? 'Logging in...' : 'Login'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      {error && <p className='text-red-500'>Login failed: {error.message}</p>}
    </div>
  )
}

export default Login;
