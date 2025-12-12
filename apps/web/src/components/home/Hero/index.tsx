export default function Hero() {
	return (
		<div className='space-y-7'>
			<div className='flex gap-2'>
				<div
					className='flex-1 relative h-64 bg-cover bg-center bg-no-repeat rounded-sm shadow-lg'
					style={{
						backgroundImage:
							"url('https://down-vn.img.susercontent.com/file/sg-11134258-822xw-mi05776kptz89f@resize_w797_nl.webp')",
					}}></div>

				<div className='flex flex-col gap-2 w-96 shrink-0'>
					<div
						className='flex-1 rounded-sm bg-center bg-cover bg-no-repeat'
						style={{
							backgroundImage:
								"url('https://down-vn.img.susercontent.com/file/sg-11134258-822wx-mi05k03ds00169@resize_w398_nl.webp')",
						}}></div>

					<div
						className='flex-1 rounded-sm bg-center bg-cover bg-no-repeat'
						style={{
							backgroundImage:
								"url('https://down-vn.img.susercontent.com/file/sg-11134258-822wk-mi05k0igzqbla8@resize_w398_nl.webp')",
						}}></div>
				</div>
			</div>

			<div className='grid grid-cols-6 gap-4'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className='flex flex-col items-center gap-4'>
						<div className='w-18 h-18 rounded-md border-2 shadow-md'></div>
						<div>Category {index + 1}</div>
					</div>
				))}
			</div>
		</div>
	)
}
