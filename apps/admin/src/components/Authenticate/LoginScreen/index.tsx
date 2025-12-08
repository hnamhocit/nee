import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/stores'
import { LoginInput, loginSchema } from '@repo/shared'

export default function LoginScreen() {
	const { login } = useUserStore()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: LoginInput) => {
		await login(data)
	}

	return (
		<div className='min-h-screen w-full relative flex items-center justify-center'>
			<div
				className='absolute inset-0 z-0'
				style={{
					background: `
            radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
            linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
          `,
				}}
			/>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-sm w-full py-7 z-20 px-4 rounded-2xl bg-white/80 backdrop-blur-md border shadow-sm'>
				<FieldSet>
					<FieldLegend>Dashboard</FieldLegend>
					<FieldDescription>
						Young man, they don't think highly of you, but giving up
						isn't in your nature.
					</FieldDescription>

					<FieldGroup>
						<Field>
							<FieldLabel htmlFor='email'>Email</FieldLabel>
							<Input
								id='email'
								autoComplete='off'
								type='email'
								placeholder='Eg: nguyenvana@gmail.com'
								{...register('email')}
								className={
									errors.email ?
										'border-red-500 focus-visible:ring-red-500'
									:	''
								}
							/>

							{errors.email && (
								<p className='text-red-500 text-xs mt-1 font-medium'>
									{errors.email.message}
								</p>
							)}
						</Field>

						<Field>
							<FieldLabel htmlFor='password'>Password</FieldLabel>

							<Input
								id='password'
								autoComplete='off'
								type='password'
								placeholder='Eg: abc12345'
								{...register('password')}
								className={
									errors.password ?
										'border-red-500 focus-visible:ring-red-500'
									:	''
								}
							/>

							{errors.password && (
								<p className='text-red-500 text-xs mt-1 font-medium'>
									{errors.password.message}
								</p>
							)}
						</Field>

						<Button
							className='w-full mt-2'
							type='submit'
							disabled={isSubmitting}>
							{isSubmitting ? 'Loading...' : 'Submit'}
						</Button>
					</FieldGroup>
				</FieldSet>
			</form>
		</div>
	)
}
