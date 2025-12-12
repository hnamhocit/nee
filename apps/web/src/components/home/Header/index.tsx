import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CameraIcon, ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
	return (
		<header className='sticky top-0 left-0 w-full z-20 bg-white shadow-sm'>
			<div className='p-4 flex items-center container mx-auto'>
				<div className='flex items-center gap-3 flex-1'>
					<Link href='/'>
						<Image
							src='/logo.png'
							alt='App Logo'
							width={48}
							height={48}
						/>
					</Link>

					<div className='font-heading text-xl font-bold'>
						E-Commerce
					</div>
				</div>

				<div className='flex-1 space-y-2'>
					<div className='flex items-center gap-3 border shadow rounded-2xl p-1'>
						<input
							placeholder='Eg: Men fashion'
							className='block bg-transparent outline-none p-2 flex-1'
						/>

						<Button
							variant='ghost'
							size='icon'>
							<CameraIcon />
						</Button>

						<Button
							size='lg'
							className='bg-red-500 rounded-2xl!'>
							Search
						</Button>
					</div>

					<div className='flex items-center gap-3'>
						<Link
							href='/#'
							className='text-sm text-red-500'>
							All Categories
						</Link>

						<Separator
							orientation='vertical'
							className='h-4!'
						/>

						<Link
							href='/#'
							className='text-sm text-red-500'>
							Deals
						</Link>

						<Separator
							orientation='vertical'
							className='h-4!'
						/>

						<Link
							href='/#'
							className='text-sm text-red-500'>
							What's New
						</Link>

						<Separator
							orientation='vertical'
							className='h-4!'
						/>

						<Link
							href='/#'
							className='text-sm text-gray-500'>
							Chrisamas atmosphere is good
						</Link>
					</div>
				</div>

				<div className='flex items-center justify-end flex-1'>
					<ShoppingCartIcon
						size={50}
						className='text-red-500'
					/>
				</div>
			</div>
		</header>
	)
}
