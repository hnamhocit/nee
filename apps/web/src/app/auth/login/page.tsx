'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import AuthLayout from '@/layouts/AuthLayout'
import { getFingerprint } from '@/utils'
import { authService, LoginInput, loginSchema } from '@repo/shared'

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
	})
	const router = useRouter()

	const onSubmit: SubmitHandler<LoginInput> = async (data) => {
		try {
			const deviceId = await getFingerprint()

			await authService.login({ ...data, deviceId })

			router.push('/')
		} catch (error) {
			if (error instanceof AxiosError) {
				const data = error.response?.data
				toast.error(data.message)
			}

			console.error('Login failed:', error)
		}
	}

	return (
		<AuthLayout type='login'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor='email'>Email</FieldLabel>

						<Input
							id='email'
							type='email'
							placeholder='name@example.com'
							{...register('email')}
						/>

						{errors.email && (
							<FieldError>{errors.email.message}</FieldError>
						)}
					</Field>

					<Field>
						<FieldLabel htmlFor='password'>Password</FieldLabel>

						<Input
							id='password'
							type='password'
							placeholder='Enter your password'
							{...register('password')}
						/>

						{errors.password && (
							<FieldError>{errors.password.message}</FieldError>
						)}
					</Field>

					<Button
						type='submit'
						className='w-full bg-red-600 hover:bg-red-700'
						size='lg'
						disabled={isSubmitting}>
						{isSubmitting ? 'Signing In...' : 'Sign In'}
					</Button>
				</FieldGroup>
			</form>
		</AuthLayout>
	)
}
