'use client'

import { Button } from '@/components/ui/button'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { ArrowLeft, Loader2, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function EmailVerificationPage() {
	const [otp, setOtp] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isResendDisabled, setIsResendDisabled] = useState(true)

	const userEmail = 'hnamhocit@gmail.com'

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		// Simulate API Call
		console.log('Verifying OTP:', otp)

		setTimeout(() => {
			setIsLoading(false)
			alert('Verification Successful!')
			// Redirect to dashboard...
		}, 2000)
	}

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className='max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-6'>
				{/* 1. Header & Icon */}
				<div className='flex flex-col items-center gap-4'>
					<div className='p-3 bg-red-50 rounded-full text-red-600'>
						<Mail
							size={32}
							strokeWidth={2}
						/>
					</div>

					<div className='space-y-2'>
						<h1 className='text-2xl font-bold font-heading text-gray-900'>
							Check your email
						</h1>

						<p className='text-sm text-gray-500 max-w-xs mx-auto leading-relaxed'>
							We sent a verification code to <br />
							<span className='font-semibold text-gray-900'>
								{userEmail}
							</span>
						</p>
					</div>
				</div>

				{/* 2. OTP Input Form */}
				<form
					onSubmit={handleSubmit}
					className='space-y-6'>
					<div className='flex justify-center'>
						<InputOTP
							maxLength={6}
							value={otp}
							onChange={(value) => setOtp(value)}>
							<InputOTPGroup>
								<InputOTPSlot
									index={0}
									className='w-10 h-12 sm:w-12 sm:h-14 text-lg'
								/>

								<InputOTPSlot
									index={1}
									className='w-10 h-12 sm:w-12 sm:h-14 text-lg'
								/>

								<InputOTPSlot
									index={2}
									className='w-10 h-12 sm:w-12 sm:h-14 text-lg'
								/>
							</InputOTPGroup>

							{/* Dấu gạch nối giúp dễ đọc hơn (3 số - 3 số) */}
							<InputOTPSeparator />

							<InputOTPGroup>
								<InputOTPSlot
									index={3}
									className='w-10 h-12 sm:w-12 sm:h-14 text-lg'
								/>

								<InputOTPSlot
									index={4}
									className='w-10 h-12 sm:w-12 sm:h-14 text-lg'
								/>

								<InputOTPSlot
									index={5}
									className='w-10 h-12 sm:w-12 sm:h-14 text-lg'
								/>
							</InputOTPGroup>
						</InputOTP>
					</div>

					<Button
						type='submit'
						className='w-full bg-red-600 hover:bg-red-700 h-11 text-base'
						disabled={otp.length < 6 || isLoading}>
						{isLoading ?
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Verifying...
							</>
						:	'Verify email'}
					</Button>
				</form>

				{/* 3. Footer Actions (Resend & Back) */}
				<div className='space-y-4'>
					<div className='text-sm text-gray-500'>
						Didn't receive the code?{' '}
						<button
							className={`font-semibold transition-colors ${
								isResendDisabled ?
									'text-gray-400 cursor-not-allowed'
								:	'text-red-600 hover:underline'
							}`}
							disabled={isResendDisabled}
							// Logic đếm ngược (Demo visual)
							onClick={() => alert('Resent!')}>
							Click to resend
						</button>
					</div>

					<div className='pt-4 border-t border-gray-100'>
						<Link
							href='/auth/login'
							className='inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors'>
							<ArrowLeft
								size={16}
								className='mr-2'
							/>
							Back to log in
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
