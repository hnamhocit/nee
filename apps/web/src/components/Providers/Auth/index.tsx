'use client'

import Loading from '@/components/Loading'
import { useUserStore } from '@/stores'
import { ReactNode, useEffect } from 'react'

const Auth = ({ children }: { children: ReactNode }) => {
	const { isLoading, checkAuth, user } = useUserStore()

	useEffect(() => {
		checkAuth()
	}, [])

	if (isLoading) {
		return <Loading />
	}

	if (!user) return children
}

export default Auth
