'use client'

import { ReactNode, useEffect } from 'react'

import { useUserStore } from '@repo/shared'
import { useRouter } from 'next/navigation'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

export default function DefaultLayout({ children }: { children: ReactNode }) {
	const { user } = useUserStore()
	const router = useRouter()

	useEffect(() => {
		if (user && user?.role !== 'ADMIN') {
			router.back()
		}
	}, [user])

	return (
		<div className='flex h-screen overflow-hidden'>
			<Sidebar />

			<div className='relative flex flex-col flex-1 h-screen overflow-hidden'>
				<Header />

				<main className='flex-1 overflow-y-auto bg-muted/10 p-4 lg:p-6'>
					{children}
				</main>
			</div>
		</div>
	)
}
