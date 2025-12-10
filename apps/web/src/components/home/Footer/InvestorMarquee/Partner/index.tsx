import Image from 'next/image'

export default function Partner({
	name,
	logo,
}: {
	name: string
	logo: string
}) {
	return (
		<div className='shrink-0 grayscale hover:grayscale-0 transition opacity-60 hover:opacity-100 cursor-pointer'>
			<Image
				src={logo}
				alt={name}
				width={100}
				height={40}
				className='object-contain'
			/>
		</div>
	)
}
