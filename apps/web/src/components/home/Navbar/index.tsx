'use client'

import { BadgeQuestionMarkIcon, BellIcon, LanguagesIcon } from 'lucide-react'
import Link from 'next/link'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { authService, useUserStore } from '@repo/shared'

export default function Navbar() {
	const { user } = useUserStore()

	return (
		<nav className='h-12 flex items-center justify-between container mx-auto px-4 text-sm text-gray-500'>
			<div className='flex items-center gap-4'>
				<Link href='/#'>Seller center</Link>

				<Link href='/#'>Download App</Link>

				<Separator
					orientation='vertical'
					className='h-6!'
				/>

				<div className='flex items-center gap-2'>
					Follow us:
					<Link href='/#'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							className='bi bi-facebook'
							viewBox='0 0 16 16'>
							<path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951' />
						</svg>
					</Link>
					<Link href='/#'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							className='bi bi-twitter-x'
							viewBox='0 0 16 16'>
							<path d='M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z' />
						</svg>
					</Link>
				</div>
			</div>

			<div className='flex items-center gap-4'>
				<div className='flex items-center gap-2'>
					<BellIcon size={18} />
					<div>Notifications</div>
				</div>

				<div className='flex items-center gap-2'>
					<BadgeQuestionMarkIcon size={18} />
					<div>Help center</div>
				</div>

				<div className='flex items-center gap-2'>
					<LanguagesIcon size={18} />
					<div>English</div>
				</div>

				{user ?
					<DropdownMenu>
						<DropdownMenuTrigger>
							<div className='font-semibold text-red-500'>
								{user.username}
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem
								variant='destructive'
								onClick={authService.logout}>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				:	<Link
						href='/auth/login'
						className='font-semibold hover:underline text-red-500'>
						Login / Register
					</Link>
				}
			</div>
		</nav>
	)
}
