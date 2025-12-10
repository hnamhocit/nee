'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const categories = [
	// From Image 1 (Top Row)
	{
		label: "Men's Fashion",
		slug: 'men-fashion',
		thumbnailURL: '/categories/men-fashion.webp',
	},
	{
		label: 'Phones & Accessories',
		slug: 'phones-accessories',
		thumbnailURL: '/categories/phones.webp',
	},
	{
		label: 'Consumer Electronics',
		slug: 'consumer-electronics',
		thumbnailURL: '/categories/electronics.jpg',
	},
	{
		label: 'Computers & Laptops',
		slug: 'computers-laptops',
		thumbnailURL: '',
	},
	{
		label: 'Cameras',
		slug: 'cameras',
		thumbnailURL: '',
	},
	{
		label: 'Watches',
		slug: 'watches',
		thumbnailURL: '',
	},
	{
		label: "Men's Shoes",
		slug: 'men-shoes',
		thumbnailURL: '',
	},
	{
		label: 'Home Appliances',
		slug: 'home-appliances',
		thumbnailURL: '',
	},
	{
		label: 'Sports & Travel',
		slug: 'sports-travel',
		thumbnailURL: '',
	},
	{
		label: 'Automotive',
		slug: 'automotive',
		thumbnailURL: '',
	},
	{
		label: "Women's Fashion",
		slug: 'women-fashion',
		thumbnailURL: '',
	},
	{
		label: 'Mother & Baby',
		slug: 'mother-baby',
		thumbnailURL: '',
	},
	{
		label: 'Home & Living',
		slug: 'home-living',
		thumbnailURL: '',
	},
	{
		label: 'Beauty',
		slug: 'beauty',
		thumbnailURL: '',
	},
	{
		label: 'Health',
		slug: 'health',
		thumbnailURL: '',
	},
	{
		label: "Women's Shoes",
		slug: 'women-shoes',
		thumbnailURL: '',
	},
	{
		label: "Women's Bags",
		slug: 'women-bags',
		thumbnailURL: '',
	},
	{
		label: 'Accessories & Jewelry',
		slug: 'accessories-jewelry',
		thumbnailURL: '',
	},
	{
		label: 'Groceries',
		slug: 'groceries',
		thumbnailURL: '',
	},
	{
		label: 'Books & Stationery',
		slug: 'books-stationery',
		thumbnailURL: '',
	},
	{
		label: "Men's Bags",
		slug: 'men-bags',
		thumbnailURL: '',
	},
	{
		label: 'Toys',
		slug: 'toys',
		thumbnailURL: '',
	},
	{
		label: 'Pet Care',
		slug: 'pet-care',
		thumbnailURL: '',
	},
	{
		label: 'Tools & Hardware',
		slug: 'tools-hardware',
		thumbnailURL: '',
	},
	{
		label: "Kids' Fashion",
		slug: 'kids-fashion',
		thumbnailURL: '',
	},
	{
		label: 'Laundry & House Care',
		slug: 'laundry-house-care',
		thumbnailURL: '',
	},
	{
		label: 'Vouchers & Services',
		slug: 'vouchers-services',
		thumbnailURL: '',
	},
]

export default function Categories() {
	const [isShowingAll, setIsShowingAll] = useState(false)

	const toggleIsShowingAll = () => {
		setIsShowingAll((prev) => !prev)
	}

	return (
		<div className='space-y-7'>
			<div className='text-2xl font-bold font-heading'>Categories</div>

			<div className='grid grid-cols-8 relative'>
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
							className='flex flex-col border hover:border-red-500 transition py-4 items-center gap-4'>
							<div
								className='w-18 h-18 rounded-md bg-cover bg-center bg-no-repeat'
								style={{
									backgroundImage: `url(${category.thumbnailURL})`,
								}}></div>

							<div>{category.label}</div>
						</Link>
					))}
			</div>
		</div>
	)
}
