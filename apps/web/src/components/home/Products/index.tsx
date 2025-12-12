export default function Products() {
	return (
		<div className='grid grid-cols-6 gap-4'>
			{Array.from({ length: 12 }).map((_, index) => (
				<div
					key={index}
					className='flex flex-col p-4 gap-4'>
					<div
						className='w-full h-40 bg-cover bg-center bg-no-repeat rounded-md bg-gray-200 transition-all hover:ring-4 hover:ring-red-500 ring-offset-4'
						style={{
							backgroundImage:
								"url('https://img.alicdn.com/bao/uploaded/i3/2214181223328/O1CN01DU7GD71aSHCQWL7sf_!!4611686018427386784-0-item_pic.jpg_460x460q90.jpg_.webp')",
						}}></div>

					<div className='font-bold font-heading line-clamp-2 text-lg'>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. {index + 1}
					</div>

					<div className='font-heading font-bold text-sm py-1 px-2 text-red-500 w-fit border-red-500 border-l-2 bg-red-100'>
						$19.99
					</div>
				</div>
			))}
		</div>
	)
}
