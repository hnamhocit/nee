import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import AuthLayout from '@/layouts/AuthLayout'

export default function LoginPage() {
	return (
		<AuthLayout type='login'>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor='email'>Email</FieldLabel>
					<Input
						id='email'
						type='email'
						placeholder='name@example.com'
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor='password'>Password</FieldLabel>
					<Input
						id='password'
						type='password'
						placeholder='Create a password'
					/>
				</Field>

				<Button
					className='w-full bg-red-600 hover:bg-red-700'
					size='lg'>
					Sign In
				</Button>
			</FieldGroup>
		</AuthLayout>
	)
}
