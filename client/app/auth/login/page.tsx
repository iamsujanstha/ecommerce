'use client'
import { useLogin } from '@/app/auth/auth.query'
import { loginFromControls, LoginType } from '@/config'
import { createDynamicCommonForm } from '@/utils/hoc/create-dynamic-form'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from 'zod'

const LoginForm = createDynamicCommonForm<LoginType>();

const initialState = {
  email: '',
  password: ''
}

const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email Address is required' }),
  password: z.string().min(1, { message: 'Password is required' })
});

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginType) => {
    mutate({ ...data });
  };

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
      <LoginForm
        formControls={loginFromControls}
        buttonText={isPending ? 'Logging in...' : 'Login'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
        ariaName='Login Form'
      />
    </div>
  )
}

export default Login;
