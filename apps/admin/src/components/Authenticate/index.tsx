'use client'

import Loading from '@/components/Loading'
import { useUserStore } from '@/stores'
import { ReactNode, useEffect } from 'react'
import LoginScreen from './LoginScreen'

const Authenticate = ({ children }: { children: ReactNode }) => {
	const { user, checkAuth, isLoading } = useUserStore()

	useEffect(() => {
		checkAuth()
	}, [checkAuth])

	if (isLoading) return <Loading />

	if (!user) return <LoginScreen />

	if (user && user.role !== 'ADMIN') {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-4xl font-bold mb-4'>Access Denied</h1>
					<p className='text-lg'>
						You do not have permission to access the admin
						dashboard.
					</p>
				</div>
			</div>
		)
	}

	return children
}

export default Authenticate
