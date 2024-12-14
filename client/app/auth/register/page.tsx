'use client'
import { useRegister } from '@/app/auth/auth.query'
import { registerFormControls, RegisterType } from '@/config'
import { createDynamicCommonForm } from '@/utility/hoc/create-dynamic-form'
import Link from 'next/link'
import React, { useState } from 'react'

const RegisterForm = createDynamicCommonForm<RegisterType>();

const initialState = {
  userName: '',
  email: '',
  password: ''
}

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { mutate, isPending } = useRegister();

  const onSubmit = () => {
    console.log(formData)
    mutate({ ...formData })
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className='mt-2'>
          Already have an account
          <Link
            className='font-medium text-primary hover:underline ml-2'
            href='/auth/login'
          >
            Login
          </Link>
        </p>
      </div>
      <RegisterForm
        formControls={registerFormControls}
        buttonText={isPending ? 'loading...' : 'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Register