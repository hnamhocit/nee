const items = [
	{
		title: 'Loyal Customer',
		slug: 'loyal-customer',
		thumbnail: 'loyal-customer.jpg',
	},
	{
		title: 'International',
		slug: 'international',
		thumbnail: 'international.avif',
	},
	{
		title: 'Flash Sale',
		slug: 'flash-sale',
		thumbnail: 'flash-sale.jpg',
	},
	{
		title: 'Best Quality',
		slug: 'best-quality',
		thumbnail: 'best-quality.avif',
	},
	{
		title: 'Vouchers & Coupons',
		slug: 'vouchers-coupons',
		thumbnail: 'voucher.avif',
	},
	{
		title: 'Free Shipping',
		slug: 'free-shipping',
		thumbnail: 'free-shipping.webp',
	},
]

export default function Hero() {
	return (
		<div className='space-y-7'>
			<div className='flex gap-4'>
				<div
					className='flex-1 relative h-84 bg-cover bg-center rounded-sm bg-no-repeat shadow'
					style={{
						backgroundImage:
							"url('https://down-vn.img.susercontent.com/file/sg-11134258-822xw-mi05776kptz89f@resize_w797_nl.webp')",
					}}></div>

				<div className='flex flex-col gap-4 w-md shrink-0'>
					<div
						className='flex-1 bg-cover bg-center shadow rounded-sm bg-no-repeat'
						style={{
							backgroundImage:
								"url('https://down-vn.img.susercontent.com/file/sg-11134258-822wx-mi05k03ds00169@resize_w398_nl.webp')",
						}}></div>

					<div
						className='flex-1 bg-center bg-cover shadow bg-no-repeat rounded-sm'
						style={{
							backgroundImage:
								"url('https://down-vn.img.susercontent.com/file/sg-11134258-822wk-mi05k0igzqbla8@resize_w398_nl.webp')",
						}}></div>
				</div>
			</div>

			<div className='grid grid-cols-6 gap-7'>
				{items.map((item) => (
					<div
						key={item.slug}
						className='flex flex-col items-center gap-4 transition-all hover:scale-105 hover:text-red-500 p-4 border border-transparent hover:border-red-500 hover:bg-white dark:hover:bg-(--sub-background)'>
						<div
							className='w-20 h-20 rounded-lg shadow bg-cover bg-center bg-no-repeat'
							style={{
								backgroundImage: `url('/hero/${item.thumbnail}')`,
							}}></div>

						<div className='font-medium transition-colors'>
							{item.title}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
