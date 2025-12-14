'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Category } from '@repo/db'
import { categoriesService, getDownloadURL } from '@repo/shared'

export default function Categories() {
	const [categories, setCategories] = useState<Category[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isShowingAll, setIsShowingAll] = useState(false)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const { data } = await categoriesService.getCategories()
				setCategories(data.data)
			} catch (error) {
				console.error('Error fetching categories:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCategories()
	})

	const toggleIsShowingAll = () => {
		setIsShowingAll((prev) => !prev)
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='space-y-7'>
			<div className='text-2xl font-bold font-heading'>Categories</div>

			<div className='grid grid-cols-8 relative bg-(--sub-background) transition duration-300'>
				<div
					className={clsx(
						'absolute top-1/2 -translate-y-1/2',
						!isShowingAll ?
							'right-0 translate-x-1/2'
						:	'left-0 -translate-x-1/2',
					)}>
					<Button
						onClick={toggleIsShowingAll}
						size='icon'
						variant='outline'>
						{isShowingAll ?
							<ChevronLeftIcon />
						:	<ChevronRightIcon />}
					</Button>
				</div>

				{categories
					.slice(
						isShowingAll ? 16 : 0,
						isShowingAll ? categories.length : 16,
					)
					.map((category) => (
						<Link
							href={`/categories/${category.slug}`}
							key={category.slug}
							className='flex flex-col border hover:border-red-500 transition py-4 items-center justify-between gap-4'>
							<div
								className='w-20 h-20 rounded-lg bg-slate-200 bg-cover bg-center bg-no-repeat'
								style={{
									backgroundImage: `url(${getDownloadURL(
										category.thumbnail ?? '',
									)})`,
								}}></div>

							<div className='text-center font-medium'>
								{category.name}
							</div>
						</Link>
					))}
			</div>
		</div>
	)
}
