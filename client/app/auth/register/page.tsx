'use client'
import { useRegister } from '@/app/auth/auth.query'
import CommonForm from '@/components/core/common-form/CommonForm'
import { registerFormControls } from '@/config'
import Link from 'next/link'
import React, { useState } from 'react'

const initialState = {
  userName: '',
  email: '',
  password: ''
}

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { mutate, isPending } = useRegister();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <CommonForm
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