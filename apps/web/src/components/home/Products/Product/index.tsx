import { FlameIcon } from 'lucide-react'

const Product = ({ index }: { index: number }) => {
	const imageUrl = `https://picsum.photos/seed/${index + 123}/400/300`

	return (
		<div className='flex flex-col p-4 gap-4'>
			<div className='relative rounded-md overflow-hidden transition-all hover:ring-4 hover:ring-red-500 ring-offset-4 ring-offset-white dark:ring-offset-(--sub-background) shadow-md'>
				<div
					className='w-full h-50 bg-cover bg-center bg-no-repeat bg-gray-200'
					style={{
						backgroundImage: `url('${imageUrl}')`,
					}}></div>
				<div className='absolute top-0 right-0 rounded-md p-2 bg-red-500 text-white'>
					<FlameIcon />
				</div>
			</div>

			<div className='space-y-2'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2 text-yellow-500'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							className='bi bi-star-fill'
							viewBox='0 0 16 16'>
							<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
						</svg>
						<span className='text-sm font-medium'>4.5</span>
					</div>

					<div className='text-sm text-gray-500 dark:text-gray-400'>
						7.9k sold
					</div>
				</div>

				<div className='font-bold font-heading line-clamp-2 text-xl'>
					Lorem ipsum dolor sit amet, consectetur adipisicing
					elit.{' '}
				</div>

				<div className='flex items-baseline gap-2'>
					{/* Giá mới: To, đậm, màu nổi bật */}
					<span className='text-lg font-bold text-red-600 dark:text-red-500'>
						$19.99
					</span>

					{/* Dấu phân cách nhẹ nhàng */}
					<span className='text-muted-foreground text-sm font-light'>
						/
					</span>

					{/* Giá cũ: Nhạt, nhỏ hơn, gạch ngang */}
					<span className='text-sm text-muted-foreground line-through decoration-muted-foreground/50'>
						$29.99
					</span>
				</div>
			</div>
		</div>
	)
}

export default Product
