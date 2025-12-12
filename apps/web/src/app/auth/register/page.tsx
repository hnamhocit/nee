'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import AuthLayout from '@/layouts/AuthLayout'
import { authService, RegisterInput, registerSchema } from '@repo/shared'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	})
	const router = useRouter()

	const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
		try {
			await authService.register(data)

			router.push('/auth/login')

			toast.success('Account created successfully. Please log in.')
		} catch (error) {
			if (error instanceof AxiosError) {
				const data = error.response?.data
				toast.error(data.message)
			}

			console.error('Register failed:', error)
		}
	}

	return (
		<AuthLayout type='register'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor='username'>Username</FieldLabel>

						<Input
							id='username'
							type='text'
							placeholder='hnamhocit'
							{...register('username')}
						/>

						{errors.username && (
							<FieldError>{errors.username.message}</FieldError>
						)}
					</Field>

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
							placeholder='Create a password'
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
						{isSubmitting ?
							'Creating Account...'
						:	'Create Account'}
					</Button>
				</FieldGroup>
			</form>
		</AuthLayout>
	)
}
