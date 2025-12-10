import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import AuthLayout from '@/layouts/AuthLayout'

export default function RegisterPage() {
	return (
		<AuthLayout type='register'>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor='username'>Username</FieldLabel>
					<Input
						id='username'
						type='text'
						placeholder='hnamhocit'
					/>
				</Field>

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

				<div className='flex items-center space-x-2'>
					<Switch id='newsletter' />
					<label
						htmlFor='newsletter'
						className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Subscribe to our newsletter
					</label>
				</div>

				<Button
					className='w-full bg-red-600 hover:bg-red-700'
					size='lg'>
					Create Account
				</Button>
			</FieldGroup>
		</AuthLayout>
	)
}
