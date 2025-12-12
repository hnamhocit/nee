'use client'

import { ReactNode, useEffect } from 'react'

import { authService, useUserStore } from '@repo/shared'
import { Loading } from '../Loading'

export const Authenticate = ({ children }: { children: ReactNode }) => {
	const { isLoading } = useUserStore()

	useEffect(() => {
		authService.checkAuth()
	}, [])

	if (isLoading) {
		return <Loading />
	}

	return children
}
