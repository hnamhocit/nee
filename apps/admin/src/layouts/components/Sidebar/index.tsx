'use client'

import Link from 'next/link'

import { NAV_ITEMS } from '../constants'
import ActiveLink from './ActiveLink'

export function Sidebar() {
	return (
		<div className='hidden shrink-0 border-r bg-muted/40 md:block w-64 h-full'>
			<div className='flex h-full max-h-screen flex-col gap-2'>
				<div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
					<Link
						href='/'
						className='flex items-center gap-2 font-semibold'>
						<span className='text-xl font-bold tracking-tight'>
							E-Shop Admin
						</span>
					</Link>
				</div>

				<div className='flex-1'>
					<nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
						{NAV_ITEMS.map((item) => (
							<ActiveLink
								key={item.href}
								{...item}
							/>
						))}
					</nav>
				</div>

				{/* Footer Sidebar (Optional) */}
				<div className='mt-auto p-4 border-t'>
					<div className='bg-muted/50 p-4 rounded-lg'>
						<p className='text-xs text-muted-foreground font-mono'>
							v1.0.0 (Beta)
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
