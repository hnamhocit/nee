import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface AuthLayoutProps {
	children: ReactNode
	type: 'login' | 'register'
}

export default function AuthLayout({ children, type }: AuthLayoutProps) {
	return (
		<div className='h-screen flex flex-col lg:flex-row bg-red-500'>
			<div
				className='hidden lg:block lg:flex-1 bg-contain bg-center bg-no-repeat relative'
				style={{
					backgroundImage: "url('/auth/bg.webp')",
				}}></div>

			<div className='flex flex-col gap-8 items-center justify-center w-full lg:w-[480px] p-6 lg:p-12 bg-white overflow-y-auto'>
				<div className='flex flex-col gap-2 items-center text-center'>
					<Link href='/'>
						<Image
							src='/logo.png'
							alt='App Logo'
							width={64}
							height={64}
						/>
					</Link>

					<div className='font-heading text-3xl font-bold text-red-500'>
						E-Commerce
					</div>
				</div>

				<form className='w-full space-y-6'>
					<div className='grid grid-cols-2 gap-3'>
						<Button
							type='button'
							variant='outline'
							className='w-full'>
							<Image
								src='/auth/google.webp'
								alt='Google'
								width={18}
								height={18}
								className='mr-2'
							/>
							Google
						</Button>

						<Button
							type='button'
							variant='outline'
							className='w-full'>
							<Image
								src='/auth/facebook.png'
								alt='Facebook'
								width={18}
								height={18}
								className='mr-2'
							/>
							Facebook
						</Button>
					</div>

					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<Separator className='w-full border-t' />
						</div>

						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-white px-2 text-gray-500'>
								Or continue with
							</span>
						</div>
					</div>

					{children}

					<div className='text-center text-sm text-gray-600'>
						{type === 'login' ?
							"Don't have an account? "
						:	'Already have an account? '}
						<Link
							href={
								type === 'login' ? '/auth/register' : (
									'/auth/login'
								)
							}
							className='text-red-600 font-semibold hover:underline'>
							{type === 'login' ? 'Register' : 'Log in'}
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
