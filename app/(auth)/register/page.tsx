'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase/client'
import { useState } from 'react'

const schema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
  userType: z.enum(['entrepreneur', 'investor', 'organization', 'service_provider']),
})

type FormValues = z.infer<typeof schema>

export default function RegisterPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      userType: 'entrepreneur',
    },
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
          user_type: values.userType,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/verify`
      },
    })
    if (error) {
      setError(error.message)
    } else {
      window.location.href = '/verify'
    }
    setLoading(false)
  }

  return (
    <div className="container max-w-lg py-12">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="mt-2 text-neutral-600">Join the Africa Growth Hub</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-neutral-600">Full Name</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            {...form.register('fullName')}
            placeholder="Your name"
          />
          {form.formState.errors.fullName && (
            <p className="text-sm text-error">{form.formState.errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm text-neutral-600">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded border px-3 py-2"
            {...form.register('email')}
            placeholder="you@example.com"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-error">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm text-neutral-600">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded border px-3 py-2"
            {...form.register('password')}
            placeholder="••••••••"
          />
          {form.formState.errors.password && (
            <p className="text-sm text-error">{form.formState.errors.password.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm text-neutral-600">I am a</label>
          <select
            className="mt-1 w-full rounded border px-3 py-2"
            {...form.register('userType')}
          >
            <option value="entrepreneur">Entrepreneur</option>
            <option value="investor">Investor</option>
            <option value="organization">Organization</option>
            <option value="service_provider">Service Provider</option>
          </select>
          {form.formState.errors.userType && (
            <p className="text-sm text-error">{form.formState.errors.userType.message}</p>
          )}
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
        <button
          type="submit"
          className="w-full rounded bg-primary-gold px-3 py-2 font-medium text-neutral-900 hover:opacity-90 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
        <div className="text-center text-sm text-neutral-600">
          Already have an account? <a href="/login" className="text-primary-blue hover:underline">Sign in</a>
        </div>
      </form>
    </div>
  )
}